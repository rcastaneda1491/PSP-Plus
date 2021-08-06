using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PSP_.Models;

/*
    Desarrollador: Rogelio Raúl Castañeda Flores 
*/

namespace PSP_
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(Usuario usuario);
    }
}
