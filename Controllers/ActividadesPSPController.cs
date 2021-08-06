using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// DOCUMENTO RELIZADO POR: Erick Eduardo Echeverría Garrido (EE) 5/08/2021 

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActividadesPSPController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int idUsuario, int? idProyecto, int? buscarProyecto, int? idTiempoPSP, int? actividadesSinProyecto)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                if(idTiempoPSP != null)
                {
                    var actividades = (from d in db.TiemposPsps
                                       select d).Where(d => d.IdTiempoPsp == idTiempoPSP).Where(d => d.IdUsuario == idUsuario).ToList();

                    return Ok(actividades);
                }

                if (actividadesSinProyecto != null)
                {
                    var actividades = (from d in db.TiemposPsps
                                       select d).Where(d => d.IdProyecto == null).ToList();

                    return Ok(actividades);
                }

                if (idProyecto == null && buscarProyecto == null)
                {
                    var actividades = (from d in db.TiemposPsps
                                            select d).Where(d => d.IdUsuario == idUsuario).OrderBy(d => d.FechaHoraInicio).ToList();

                    return Ok(actividades);
                }
                else
                {
                    if (buscarProyecto == null)
                    {
                        var actividades = (from d in db.TiemposPsps
                                           select d).Where(d => d.IdUsuario == idUsuario).Where(d => d.IdProyecto == idProyecto).OrderBy(d => d.FechaHoraInicio).ToList();

                        return Ok(actividades);
                    }
                    else
                    {

                        var proyectos = (from p in db.Proyectos join d in db.UsuarioProyectos on p.IdProyecto equals d.IdProyecto where d.IdUsuario == idUsuario select p).ToList();


                        return Ok(proyectos);
                    }

                        
                }
            }
        }


        [HttpPost]
        public ActionResult Post(DateTime fechaHoraInicio, DateTime fechaHoraFinal, string descripcion, int? idProyecto, int idUsuario)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.TiemposPsp actividad = new Models.TiemposPsp();

                actividad.FechaHoraInicio = fechaHoraInicio;
                actividad.FechaHoraFinal = fechaHoraFinal;
                actividad.Descripcion = descripcion;
                if(idProyecto != null)
                {
                    actividad.IdProyecto = idProyecto;
                }
                actividad.IdUsuario = idUsuario;
 
                db.TiemposPsps.Add(actividad);
                db.SaveChanges();

            }

            return Ok("La actividad se agrego correctamente");
        }


        [HttpDelete]
        public ActionResult Delete(int idTiempoPSP)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                try
                {
                   Models.TiemposPsp actividad = db.TiemposPsps.Find(idTiempoPSP);

                    db.TiemposPsps.Remove(actividad);
                    db.SaveChanges();

                    return Ok("La actividad se elimino correctamente");
                }
                catch (Exception)
                {
                    return Ok("Error");
                }
            }
        }

        [HttpPut]
        public ActionResult Put(int idTiempoPSP, DateTime fechaHoraInicio, DateTime fechaHoraFinal, string descripcion, int? idProyecto)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.TiemposPsp datos = db.TiemposPsps.Find(idTiempoPSP);

                datos.FechaHoraInicio = fechaHoraInicio;
                datos.FechaHoraFinal = fechaHoraFinal;
                datos.Descripcion = descripcion;
                if(idProyecto != null)
                {
                    datos.IdProyecto = idProyecto;
                }
                else
                {
                    datos.IdProyecto = null;
                }

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Datos Actualizados Correctamente");

            }
        }


    }
}
