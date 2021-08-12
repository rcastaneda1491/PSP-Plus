function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

(function () {
    const inicio = document.getElementById("fechaInicio");
    const fin = document.getElementById("fechaFinal");
    const listado = document.getElementById('lista-actividades')
    const btnBuscar = document.getElementById('buscar');
    

    let idUsuario;
    let proyecto;
    let desProyecto;  

    btnBuscar.addEventListener('click', mostrarReporte);
 
  
   async function mostrarReporte() {

    let fnn= String(inicio.value) + ' 00:00:00';
    let inn= String(fin.value) + ' 23:59:59';

    console.info(fnn);
    console.info(inn);
       
      listado.innerHTML = "";
      const actividades = await obtenerActividades(idUsuario,fnn,inn);
      console.info(actividades);
  
      actividades.forEach((element) => {
        const { idActividad, idProyecto, idUsuario, nombreUsuario, apellidoUsuario, descripcionActividad, descripcionProyecto, fechaInicio,
        fechaFinal, nombreProyecto } = element;

        var fechaInicioSplit = fechaInicio.split("T");
        let fechaInicioN = fechaInicioSplit[0];
        var HoraInicioSplit = fechaInicioSplit[1].split(":00");
        let horaInicio = HoraInicioSplit[0];

        var fechaFinalSplit = fechaFinal.split("T");
        let fechaFinalN = fechaFinalSplit[0];
        var HoraFinalSplit = fechaFinalSplit[1].split(":00");
        let horaFinal = HoraFinalSplit[0];
      

        if(nombreProyecto == null){
          proyecto = 'Sin asignación de proyecto';
          desProyecto = 'Tarea sin proyecto asignado'
        } else{
          proyecto = nombreProyecto;
          desProyecto = descripcionProyecto;
        }

        calcularHoras(fechaInicio,fechaFinal);
        
        const row = document.createElement("tr");
       
        row.innerHTML += `
                <td>${nombreUsuario} ${apellidoUsuario}</td>
                <td>${proyecto}</td>
                <td>${desProyecto}</td>
                <td>${descripcionActividad}</td>
                <td>${fechaInicioSplit}</td>
                <td>${fechaFinalSplit}</td>
                <td>${totalHoras}</td>
                `;
  
        listado.appendChild(row);
      });
    }

    let totalHoras = 0;

function calcularHoras(horaInicio, horaFinal) {

    let a = moment(horaFinal);//now
    let b = moment(horaInicio);

    totalHoras = totalHoras + parseInt(a.diff(b, 'hours')); // 44700

}

  
    
    const onLoaded = () => {
        const stringJWT = Cookies.get('jwt');
        let jwt;
        
        if (stringJWT) {
            jwt = parseJwt(stringJWT);
        }
        
        console.info()
        
         idUsuario = jwt.sub;
         console.info(idUsuario);

    };
    document.addEventListener("DOMContentLoaded", onLoaded);
  })();

