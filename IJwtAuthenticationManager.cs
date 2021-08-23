using PSP_.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
