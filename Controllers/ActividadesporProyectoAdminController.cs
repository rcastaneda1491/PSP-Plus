using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSP_.Controllers

{
  
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActividadesporProyectoAdminController : Controller
    {
        [HttpGet]

        public ActionResult Get(int? proyecto, int? id)
        {
            using (Models.DBPSPPLUSContext db = new Models.DBPSPPLUSContext())
            {
               if (id != null)
                {
                    var proyectos = (from p in db.Proyectos select p).Distinct().ToList();
                    return Ok(proyectos);
                }


                var dt = new List<Datos>();


                using (SqlConnection sql = new SqlConnection("Server=DESKTOP-0C3G53Q;DATABASE=DBPSPPLUS;user=capacitacion;password=123456"))
                {
                    using (SqlCommand cmd = new SqlCommand("reporteActividades_por_proyecto", sql))
                    {

                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@idProyecto", proyecto));

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
