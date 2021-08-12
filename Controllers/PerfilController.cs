using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class PerfilController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int? idUsuario)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var usuario = db.Usuarios.Find(idUsuario);

                return Ok(usuario);
            }
        }

        [HttpPut]
        public ActionResult Put(int? idUsuario, string nombre, string apellido, string email, string clave, DateTime fechaNacimiento, int idEquipo)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.Usuario datos = db.Usuarios.Find(idUsuario);

                datos.Nombres = nombre;
                datos.Apellidos = apellido;
                datos.Email = email;
                datos.Clave = clave;
                datos.FechaNacimiento = fechaNacimiento;
                datos.IdEquipoDesarrollo = idEquipo;

                db.Entry(datos).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return Ok("Datos Actualizados Correctamente");

            }
        }
    }
}
