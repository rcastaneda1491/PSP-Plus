﻿
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


        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var query = db.UsuarioProyectos.Select(usuario => new
                {
                    IdProyecto = usuario.IdProyecto,
                    Nombre = usuario.IdUsuarioNavigation.Nombres,
                    Apellido = usuario.IdUsuarioNavigation.Apellidos,
                    Correo = usuario.IdUsuarioNavigation.Email

                }).Where(usuario => usuario.IdProyecto == id).ToList();

                return Ok(query);

            }
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] Models.UsuarioProyecto modelo)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                Models.UsuarioProyecto usuario = db.UsuarioProyectos.Find(modelo.IdUsuario, modelo.IdProyecto);


                db.UsuarioProyectos.Remove(usuario);
                db.SaveChanges();

            }
            return Ok("El desarrollador ha sido eliminado del proyecto con éxito");
        }


    }
}
