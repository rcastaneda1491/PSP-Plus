//Julio Garcia
//5/08/2021
const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputClave = document.querySelector('#clave');
const inputFecha = document.querySelector('#fecha');
const inputEquipo = document.querySelector('#equipo');

const alerta = document.querySelector('#alert');


const urlParams = new URLSearchParams(window.location.search);
const idUsuario = urlParams.get('Userid');

const array = [];
const array2 = [];

var editar = 0;

window.onload = () =>{
    getEquipos();
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

async function getEquipos(){
    const url = `https://localhost:5001/api/GetEquiposDesarrollo`;

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

function llenararreglo(datos){
    datos.forEach(equipos =>{
        array.push(equipos.nombre)
        array2.push(equipos.idEquipoDesarrollo)
    })

    cargar();
}

function cargar(){

    var select = document.getElementById("equipo");

    for(var i=0;i<array.length;i++){ 
        option = document.createElement("option");
        option.value = array2[i];
        option.text = array[i];
        select.appendChild(option);
     }

     getUser();
}


async function getUser(){
    const url = `https://localhost:5001/api/EquipoDesarrolloNombre?idUsuario=${idUsuario}`;

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

function mostrarDatos(datos){
    datos.forEach(usuario =>{
        var fechaSplit = usuario.fechaNacimiento.split("T");
        var fecha = fechaSplit[0];

        inputNombre.value = usuario.nombres;
        inputApellido.value = usuario.apellidos; 
        inputEmail.value = usuario.email;
        inputClave.value = usuario.clave; 
        inputFecha.value = fecha; 

        for(var i = 0; i < inputEquipo.options.length; i++){
            if(inputEquipo.options[i].value == usuario.idEquipoDesarrollo){
                inputEquipo.options[i].selected = true;
            }
        }

    })
}

function validar(){
    if(inputNombre.value == ""||inputApellido.value == ""|| inputEmail.value == ""|| inputClave.value == ""|| inputFecha.value == "" || inputEquipo.value == 0){
        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    }else{
        
        editUser();


    }
}

async function editUser(){
    const url = `https://localhost:5001/api/AgregarUsuarios?idUsuario=${idUsuario}&nombre=${inputNombre.value}&apellido=${inputApellido.value}&email=${inputEmail.value}&clave=${inputClave.value}&fechaNacimiento=${inputFecha.value}&idEquipo=${inputEquipo.value}`;

    await fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)


    editar = 2;
    window.location.href = (`./List-User.html?validar=${editar}`);
 
}




