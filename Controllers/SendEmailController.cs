using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace PSP_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SendEmailController : ControllerBase
    {
        private string from = "pspplusti@gmail.com";

        [HttpPost]

        public ActionResult SendEmail(string to, string descripcion)
        {

            MailMessage message = new MailMessage(from, to);

            string mailbody = $"<div> <div> <h2>Recordatorio</h2> <p>{descripcion}</p></div></div>";
            message.Subject = "Recordatorios PSP+";
            message.Body = mailbody;
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587); //Gmail smtp    
            System.Net.NetworkCredential basicCredential1 = new
            System.Net.NetworkCredential("pspplusti@gmail.com", "PruebaProyecto1914");
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicCredential1;
            try
            {
                client.Send(message);
                return Ok("Enviado");
            }

            catch (Exception ex)
            {
                return Ok(ex.ToString());
            }
        }
       
        

    }   
}
