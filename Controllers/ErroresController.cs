using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ErroresController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post(DateTime fecha, string descripcion, string solucion, int correlativo, string tipoError, string introducido, string eliminado, 
            DateTime fechaHoraInicio, DateTime fechaHoraFinal, decimal tiempoCorrecion, string lenguaje, int? idProyecto, int idUsuario)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.ErroresPsp error = new Models.ErroresPsp();

                error.Fecha = fecha;
                error.Descripcion = descripcion;
                error.Solucion = solucion;
                error.Correlativo = correlativo;
                error.TipoError = tipoError;
                error.Introducido = introducido;
                error.Eliminado = eliminado;
                error.FechaHoraInicio = fechaHoraInicio;
                error.FechaHoraFinal = fechaHoraFinal;
                error.TiempoCorrecion = tiempoCorrecion;
                error.LenguajeDesarrollo = lenguaje;
                if (idProyecto != null)
                {
                    error.IdProyecto = idProyecto;
                }
                error.IdUsuario = idUsuario;

                db.ErroresPsps.Add(error);
                db.SaveChanges();

            }

            return Ok("El error se agrego correctamente");
        }
    }
}
