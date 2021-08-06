/* 
    Desarrollador: Rogelio Raúl Castañeda Flores
*/

const direccion = "25.104.8.22:5001";

const submitButton = document.getElementById("submitButton");
const form = document.getElementById("form");
const correoInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const nombresInput = document.getElementById("inputNames");
const apellidosInput = document.getElementById("inputSurname");
const telefonoInput = document.getElementById("inputPhone");
const nitInput = document.getElementById("inputNIT");
const rolInput = document.getElementById("rolInput");
const loginButton = document.getElementById("loginButton");

window.onload = () => {

    submitButton.addEventListener('click', validarDatos);
}

function validarDatos(e) {
    e.preventDefault();

    if (nombresInput.value != "" && 
        rolInput.value != "" &&
        apellidosInput.value != "" &&
        correoInput.value != "" &&
        telefonoInput.value != "" &&
        nitInput.value != "" &&
        passwordInput.value != ""
    ) {
        crearUsuario();
    } else {
        alert("Todos los datos son necesarios");
    }
}

let cantidadCorreos = false;

function validarCorreos(usuarios){
    usuarios.forEach(usuario => {
    
        if(correoInput.value == usuario.correo){
            cantidadCorreos = true;
        }
        
    })
}

async function crearUsuario() {

    const URLComentarios = `https://${direccion}/api/Usuarios`;

    await fetch(URLComentarios)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            validarCorreos(resultado);
        })

    if(cantidadCorreos == true){
        alert('Correo ya existente, por favor intentelo nuevamente');

        correoInput.value = '';

        return;
    }

    const urlCrearUsuario = `https://${direccion}/api/Usuarios?Nombres=${nombresInput.value}&Apellidos=${apellidosInput.value}&Correo=${correoInput.value}&NoTelefono=${telefonoInput.value}&Nit=${nitInput.value}&Clave=${passwordInput.value}&Rol=${rolInput.value}`;

    await fetch(urlCrearUsuario, { method: 'POST' })
        .then(respuesta => respuesta)

    alert('Usuario Agregado Exitosamente');

    nombresInput.value = ""; 
    rolInput.value = "";
    apellidosInput.value = "";
    correoInput.value = "";
    telefonoInput.value = "";
    nitInput.value = "";
    passwordInput.value = "";

    window.location.href = ('../../Iniciar-Sesion/Index.html');


}