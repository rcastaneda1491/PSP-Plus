using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/*
    Desarrollador: Rogelio Raúl Castañeda Flores 
*/

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("permitir")]
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;

        public UsuariosController(IJwtAuthenticationManager jwtAuthenticationManager)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("SignIn")]
        public ActionResult Post([FromBody] DTO.SignInDTO credentials)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var user = db.Usuarios.Where(x => x.Email == credentials.Email && x.Clave == credentials.Clave).FirstOrDefault();

                if (user == null)
                {
                    var tokenEmpty = "";
                    return Ok(tokenEmpty);
                }

                var token = jwtAuthenticationManager.Authenticate(user);
                return Ok(token);
            }
        }
    }
}
