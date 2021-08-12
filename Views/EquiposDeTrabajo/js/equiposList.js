/*
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

const cardListElement = document.getElementById("lista-equipos");
const exitoso = document.querySelector('#guardado');
const exitoso2 = document.querySelector('#editado');
const exitoso3 = document.querySelector('#eliminado');
const alerta = document.querySelector('#alert');
const inpuntsearch = document.querySelector('#search');

const urlParams = new URLSearchParams(window.location.search);
const val = urlParams.get('validar');
let eliminar = 0;


window.onload = () => {
    validacion();
    GetDatos();

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

function validacion() {
    if (val == 1) {

        exitoso.textContent = "Equipo Agregado Correctamente"
        exitoso.style.display = 'block';
        setTimeout(() => {
            exitoso.style.display = 'none';
        }, 3000);
    } else if (val == 2) {
        exitoso2.textContent = "Equipos Actualizado Correctamente"
        exitoso2.style.display = 'block';
        setTimeout(() => {
            exitoso2.style.display = 'none';
        }, 3000);

    } else if (val == null) {
        return;
    }
    setTimeout(() => {
        history.pushState(null, "", "./equiposList.html");
    }, 3000);
}


async function GetDatos() {
    if (eliminar == 1) {

        exitoso3.textContent = "Equipo Eliminado Correctamente"
        exitoso3.style.display = 'block';
        setTimeout(() => {
            exitoso3.style.display = 'none';
        }, 3000);

        eliminar = 0;
    }
    const url = `https://localhost:44368/api/GetEquiposDesarrollo`;

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


function mostrarDatos(datos) {
    document.getElementById("lista-equipos").innerHTML = "";

    datos.forEach(equipo => {
        const card = `
            <tr>
              <td>${equipo.idEquipoDesarrollo}</td>
              <td>${equipo.nombre}</td>
              <td>${equipo.descripcion}</td>
              <td><button class="btn edit" id="detalle" data-id="${equipo.idEquipoDesarrollo}" style="background-color: #4F73CF; color:white;"> Editar </button></td>
              <td><button class="btn delete" id="detalle" data-id="${equipo.idEquipoDesarrollo}" style="background-color: #09254F; color:white;"> Eliminar </button></td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })

    var elements = document.getElementsByClassName("edit");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', modificarEquipo);
    }

    var elements2 = document.getElementsByClassName("delete");

    for (var i = 0; i < elements2.length; i++) {
        elements2[i].addEventListener('click', eliminarEquipo);
    }

}

function modificarEquipo(e) {
    const equipo = e.target.parentElement.parentElement;
    const equipoId = equipo.querySelector('button').getAttribute('data-id');

    window.location.href = (`./editEquipo.html?idEquipo=${equipoId}`);
}

async function eliminarEquipo(e) {

    const equipo = e.target.parentElement.parentElement;
    const equipoId = equipo.querySelector('button').getAttribute('data-id');
    const confirmar = confirm('¿Desea Eliminar Equipo de Trabajo?');
    if (confirmar) {
        const urlEliminarEquipo = `https://localhost:44368/api/GetEquiposDesarrollo?idEquipo=${equipoId}`;

        await fetch(urlEliminarEquipo, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)

        eliminar = 1;
        GetDatos();

    } else {
        return;
    }

}


async function searchProyectos() {
    document.getElementById('alert').style.display = 'none';
    if (inpuntsearch.value == "") {
        document.getElementById("lista-equipos").innerHTML = "";
        GetDatos();
    }
    else {
        document.getElementById("lista-equipos").innerHTML = "";
        const url = `https://localhost:44368/api/equiposTrabajoBusqueda?nombre=${inpuntsearch.value}`;
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