using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace PSP_.Models
{
    //Albin Cordero 09/08/2021
    [Route("api/[controller]")]
    [ApiController]
    public class ExportarExcel : ControllerBase
    {
        [HttpGet]
        [Route("Reporte1")]
        public ActionResult Get()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                SLDocument sl = new SLDocument();
                sl.SetCellValue("A1", "Hola Mundo");
                var ms = new MemoryStream();
                sl.SaveAs(ms);
                ms.Position = 0;

                return File(ms,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","test.xlsx");

            }
        }
        [HttpGet]
        [Route("Reporte2")]
        public ActionResult Get2()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                SLDocument sl = new SLDocument();
                //titulos
                sl.SetCellValue("B2", "");
                var ms = new MemoryStream();
                sl.SaveAs(ms);
                ms.Position = 0;

                return File(ms, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Errores General"+DateTime.Today.Date.ToShortDateString() + ".xlsx");

            }
        }
        [HttpGet]
        [Route("Reporte3")]
        public ActionResult Get3()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                SLDocument sl = new SLDocument();
                sl.SetCellValue("A1", "Hola Mundo");
                var ms = new MemoryStream();
                sl.SaveAs(ms);
                ms.Position = 0;

                return File(ms, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Errores-Desarrollador-" + DateTime.Today.Date.ToShortDateString() + ".xlsx");

            }
        }
        [HttpGet]
        [Route("Reporte4")]
        public ActionResult Get4()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                SLDocument sl = new SLDocument();
                sl.SetCellValue("A1", "Hola Mundo");
                var ms = new MemoryStream();
                sl.SaveAs(ms);
                ms.Position = 0;

                return File(ms, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Errores-Proyecto-"  + DateTime.Today.Date.ToShortDateString()+".xlsx");

            }
        }
        [HttpGet]
        [Route("Reporte5")]
        public ActionResult Get5()
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
                SLDocument sl = new SLDocument();
                //titulos
                sl.SetCellValue("A1", "Hola Mundo");
                var ms = new MemoryStream();
                sl.SaveAs(ms);
                ms.Position = 0;

                return File(ms, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Analisis-" + DateTime.Today.Date.ToShortDateString() + ".xlsx");

            }
        }
    }
}
