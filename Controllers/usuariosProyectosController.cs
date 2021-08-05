
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
    public class usuariosProyectosController : ControllerBase
    {
        [HttpPost]
        public ActionResult Post([FromBody] Models.UsuarioProyecto modelo)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.UsuarioProyecto usuarioP = new Models.UsuarioProyecto();

                usuarioP.IdProyecto = modelo.IdProyecto;
                usuarioP.IdUsuario = modelo.IdUsuario;

                db.UsuarioProyectos.Add(usuarioP);
                db.SaveChanges();

            }

            return Ok("El usuario se añadio correctamente a un proyecto");
        }
    }
}
