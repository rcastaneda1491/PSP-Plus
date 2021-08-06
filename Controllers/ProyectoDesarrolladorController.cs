﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectoDesarrolladorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(int IdEquipo)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var comentario = (from d in db.Proyectos.Where(b => b.IdProyecto == IdEquipo)
                                  select d).ToList();

                return Ok(comentario);
            }

        }
    }
}
