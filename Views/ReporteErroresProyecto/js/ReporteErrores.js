//Roberto González
const cardListElement = document.getElementById("lista-erroesp");

const inputproyecto = document.querySelector('#equipo');
const inpuntsearch = document.querySelector('#search');
const alerta = document.querySelector('#alert');

const array = ["--Seleccione una opcion--"];
const array2 = [0];


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



window.onload = () => {
    getProyectos();
}


async function getProyectos() {
    var url;
    if(jwt.rol == "desarrollador"){
        url = `https://localhost:44368/api/ReporteErroresProyecto?idUsuario=${jwt.sub}`;
    }else if(jwt.rol == "administrador"){
        url = `https://localhost:44368/api/ReporteErroresProyecto`;
    }
    

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            llenararreglo(resultado);
        })
}


function llenararreglo(datos) {
    datos.forEach(proyectos => {
        array.push(proyectos.nombre)
        array2.push(proyectos.idProyecto)
    })

    cargar();
}


function cargar() {

    var select = document.getElementById("equipo");

    for (var i = 0; i < array.length; i++) {
        option = document.createElement("option");
        option.value = array2[i];
        option.text = array[i];
        select.appendChild(option);
    }
}




async function GetDatos() {
    if(inputproyecto.value== 0){
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
    }else{
    const url = `https://localhost:44368/api/ReporteErroresProyectoTabla?idProyecto=${inputproyecto.value}`;

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatos(resultado);
        })
    } 
}


function mostrarDatos(datos) {
    document.getElementById("lista-erroesp").innerHTML = "";

    datos.forEach(proyectos => {
        //var fechaSplit = proyectos.fechaNacimiento.split("T");
        //var fecha = fechaSplit[0];
        const card = `
            <tr>
              <td>${proyectos.nombres}</td> 
              <td>${proyectos.apellidos}</td>
              <td>${proyectos.email}</td>
              <td>${proyectos.cantidadErrores}</td>
              <td>${proyectos.cantidadHoras}</td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })

}