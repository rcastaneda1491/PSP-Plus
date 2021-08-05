const inputNombre = document.querySelector('#nombre');
const inputApellido = document.querySelector('#apellido');
const inputEmail = document.querySelector('#email');
const inputClave = document.querySelector('#clave');
const inputFecha = document.querySelector('#fecha');
const inputEquipo = document.querySelector('#equipo');
const array = ["---Seleccione una opcion---"];
const array2 = [0];


window.onload = () =>{
    getEquipos();
}

async function getEquipos(){
    const url = `https://localhost:44368/api/GetEquiposDesarrollo`;

    await fetch(url, {
        headers: new Headers({
            //'Authorization': 'Bearer ' + stringJWT
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
        //array.push(equipos.)
    })

    cargar();
}

function cargar(){

    var nombre = document.getElementById("equipo");

    for(var i=0;i<array.length;i++){ 
        nombre.options[i] = new Option(array[i]);
     }
}

async function agregarUser(){
    debugger;
    const url = `https://localhost:44368/api/AgregarUsuarios?nombre=${inputNombre.value}&apellido=${inputApellido.value}&email=${inputEmail.value}&clave=${inputClave.value}&fechaNacimiento=${inputFecha.value}&idEquipo=${inputEquipo.value}`;

    await fetch(url, {
        method: 'POST',
        headers: new Headers({
            //'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
 
}



