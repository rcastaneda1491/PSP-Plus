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
    //[Authorize]
    public class AgregarUsuariosController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var usuarios = (from d in db.Usuarios select d).ToList();

                return Ok(usuarios);
            }
        }

        [HttpPost]
        public ActionResult Post(string nombre, string apellido, string email, string clave,DateTime fechaNacimiento,int idEquipo)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.Usuario usuario = new Models.Usuario();

                usuario.Nombres = nombre;
                usuario.Apellidos = apellido;
                usuario.Email = email;
                usuario.Clave = clave;
                usuario.FechaNacimiento = fechaNacimiento;
                usuario.IdEquipoDesarrollo = idEquipo;

                db.Usuarios.Add(usuario);
                db.SaveChanges();

            }

            return Ok("El usuario se añadio correctamente");
        }

    }
}
