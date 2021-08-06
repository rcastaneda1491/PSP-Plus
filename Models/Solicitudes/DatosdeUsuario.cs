﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSP_.Models.Solicitudes
{
    public class DatosdeUsuario
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int IdEquipoDesarrollo { get; set; }
        public string NombreEquipo { get; set; }
    }
}
