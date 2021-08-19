//Julio Garcia
//5/08/2021
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputClave = document.querySelector('#clave');
const inputFecha = document.querySelector('#fecha');
const inputEquipo = document.querySelector('#equipo');
const inputRol = document.querySelector('#rol');

const alerta = document.querySelector('#alert');
const alerta2 = document.querySelector('#alert2');


const array = ["---Seleccione una opcion---"];
const array2 = [0];

let cantidadCorreos = false;

var validado = 0;

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
    getEquipos();
}

function validarCorreos(usuarios) {

    usuarios.forEach(usuario => {

        if (inputEmail.value == usuario.email) {
            cantidadCorreos = true;
        }

    })
}

async function getEquipos() {
    const url = `https://localhost:44368/api/GetEquiposDesarrollo`;

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
    datos.forEach(equipos => {
        array.push(equipos.nombre)
        array2.push(equipos.idEquipoDesarrollo)
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


async function agregarUser() {


    const usarios = `https://localhost:44368/api/EquipoDesarrolloNombre`;

    await fetch(usarios, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            validarCorreos(resultado);
        })



    if (cantidadCorreos == true) {
        alerta2.style.display = 'block';

        setTimeout(() => {
            alerta2.style.display = 'none';
        }, 3000);

        inputEmail.value = '';
        cantidadCorreos = false;
        return;
    }

    const url = `https://localhost:44368/api/AgregarUsuarios?nombre=${inputNombre.value}&apellido=${inputApellido.value}&email=${inputEmail.value}&clave=${inputClave.value}&fechaNacimiento=${inputFecha.value}&idEquipo=${inputEquipo.value}&rol=${inputRol.value}`;

    await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)

    validado = 1;

    window.location.href = (`./List-User.html?validar=${validado}`);

}

function validar() {
    if (inputNombre.value == "" || inputApellido.value == "" || inputEmail.value == "" || inputClave.value == "" || inputFecha.value == "" || inputEquipo.value == 0 || inputRol.value == "") {
        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    } else {

        agregarUser();
    }

}







