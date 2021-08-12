/*Débora Chacach
10/08/2021*/
const cardListElement = document.getElementById("lista-actividades");
const alerta = document.querySelector('#alert');
const inpuntsearch = document.querySelector('#search');
const alerta2 = document.querySelector('#alert2');



const urlParams = new URLSearchParams(window.location.search);
const val = urlParams.get('validar');
let eliminar = 0;


window.onload = () => {
  llenarSelect();
   // GetDatos();

}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
const stringJWT = Cookies.get('jwt');
let jwt;
if (stringJWT) {
    jwt = parseJwt(stringJWT);
}
const id=jwt.sub;
// async function GetDatos() {
//     if (eliminar == 1) {

//         exitoso3.textContent = "Usuario Eliminado Correctamente"
//         exitoso3.style.display = 'block';
//         setTimeout(() => {
//             exitoso3.style.display = 'none';
//         }, 3000);

//         eliminar = 0;
//     }
//     const url = `https://localhost:44368/api/ReporteActividadesporProyecto?/Actividades`;

//     await fetch(url, {
//         headers: new Headers({
//             'Authorization': 'Bearer ' + stringJWT
//         })
//     })
//         .then(respuesta => respuesta.json())
//         .then(resultado => {
//             mostrarDatos(resultado);
//         })
// }

function mostrarDatos(datos) {
    document.getElementById("lista-actividades").innerHTML = "";

    datos.forEach(actividad => {
       
   var arrayfechaI=actividad.fechaHoraInicio.split(/-|T|:/);
   var fecha_formateadaI=arrayfechaI.splice(0,3).reverse().join('/');
   var segundosI=arrayfechaI.pop();
   var hora_formateadaI= arrayfechaI.join(':');

   var arrayfechaF=actividad.fechaHoraFin.split(/-|T|:/);
   var fecha_formateadaF=arrayfechaF.splice(0,3).reverse().join('/');
   var segundosF=arrayfechaF.pop();
   var hora_formateadaF= arrayfechaF.join(':');



   
        const card = `
            <tr>
              <td>${actividad.descripcion}</td>
              <td>${fecha_formateadaI} 
              / ${hora_formateadaI} </td>
              <td>${fecha_formateadaF} 
              / ${hora_formateadaF} </td>
              <td>${actividad.horas}</td>
              <td>${actividad.nombreUsuario}</td>

            </tr>
        `;
        cardListElement.innerHTML += card;
    })

    

}


async function llenarSelect(){
    url= `https://localhost:44368/api/ReporteActividadesporProyecto?id=${id}`;
    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(proyectos => selectProyecto(proyectos))
}
function selectProyecto(proyectosList){
    proyectosList.forEach(proyecto => {
        const { nombre, idProyecto } = proyecto;

        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        inpuntsearch.appendChild(option);

    });
}

async function searchCursos() {
    document.getElementById('alert').style.display = 'none';
    if (inpuntsearch.value == "") {
        document.getElementById("lista-actividades").innerHTML = "";
        alerta2.style.display = 'block';

        setTimeout(() => {
            alerta2.style.display = 'none';
        }, 3000);

        return;
        // GetDatos();
    }
    else {
        document.getElementById("lista-actividades").innerHTML = "";
        const url = `https://localhost:44368/api/ReporteActividadesporProyecto?proyecto=${inpuntsearch.value}`;
        await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })

            .then(respuesta => respuesta.json())
            .then(resultado => {
                mostrarDatos(resultado);
                if (Object.keys(resultado).length == 0) {
                    document.getElementById('alert').style.display = 'block';
                } else {

                    document.getElementById('alert').style.display = 'none';
                }
            })
    }
}