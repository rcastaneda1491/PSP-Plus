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
    public class ReporteTipoErrorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(string tipoerror)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                var reporte = (from e in db.ErroresPsps where e.TipoError == tipoerror select e).ToList();

                return Ok(reporte);
            }
        }
    }
}
