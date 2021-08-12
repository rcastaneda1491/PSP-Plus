using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// Débora Chacach 11/08/2021
namespace PSP_.Controllers
{
    partial class Datos
    {
        public string descripcion { get; set; }
        public DateTime fechaHoraInicio { get; set; }
        public DateTime fechaHoraFin { get; set; }
        public double horas { get; set; }
        public string nombreUsuario { get; set; }
        public string nombreProyecto { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class ReporteActividadesporProyectoController : Controller
    {
        [HttpGet]

        public ActionResult Get(string proyecto, int? id)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                /* var actividades = (from u in db.Usuarios 
                                    join up in db.UsuarioProyectos on u.IdUsuario equals up.IdUsuario 
                                    join p in db.Proyectos on up.IdProyecto equals p.IdProyecto
                                    join TpSp in db.TiemposPsps on u.IdUsuario equals TpSp.IdUsuario
                                    join EpSp in db.ErroresPsps on u.IdUsuario equals EpSp.IdUsuario
                                    where p.IdProyecto == proyecto
                                    select u).ToList();

                 return Ok(actividades);*/

                if (id != null)
                {
                    var proyectos = (from p in db.Proyectos join d in db.UsuarioProyectos on p.IdProyecto equals d.IdProyecto where d.IdUsuario == id select p).ToList();
                    return Ok(proyectos);
                }

                var dt = new List<Datos>();


                using (SqlConnection sql = new SqlConnection("Server=DESKTOP-0C3G53Q;DATABASE=DBPSPPLUS;user=capacitacion;password=123456"))
                {
                    using (SqlCommand cmd = new SqlCommand("reporteActividades_por_proyecto", sql))
                    {

                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@nombreProyecto", proyecto));

                        sql.Open();
                        using (var reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var temp = new Datos();
                                temp.descripcion = reader.GetString(0);
                                temp.fechaHoraInicio = reader.GetDateTime(1);
                                temp.fechaHoraFin = reader.GetDateTime(2);
                                temp.horas = reader.GetDouble(3);
                                temp.nombreUsuario = reader.GetString(4);
                                temp.nombreProyecto = reader.GetString(5);
                                dt.Add(temp);
                            }
                            return Ok(dt);
                        }
                    }


                }
            }
        }

       
    }
}