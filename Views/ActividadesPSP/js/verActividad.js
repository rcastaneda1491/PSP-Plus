// DOCUMENTO RELIZADO POR: Erick Eduardo Echeverría Garrido (EE) 11/08/2021 

// ---------------------------------- Funciones cookies ----------------------------------
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

function CerrarSesion() {
    Cookies.remove('jwt');
};

const idUsuario = jwt.sub;
// ---------------------------------- FIN Funciones cookies ----------------------------------
// ------------------- FUNCION Para obtener datos De la URL ----------------------------------
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// ------------------- FIN FUNCION Para obtener datos De la URL ----------------------------------

let url = 'https://localhost:44368';


let idTiempoPSP = getParameterByName('actividad');

const formulario = document.querySelector('#formulario');
const descripcionInput = document.querySelector('#descripcion');
const fechaHoraInicioInput = document.querySelector('#fechaHoraInicio');
const fechaHoraFinalInput = document.querySelector('#fechaHoraFinal');
const proyectosSelect = document.querySelector('#proyectos-listado');


window.onload = () => {
    obtenerProyectos();
}

async function obtenerProyectos() {

    mostrarSpinner();

    const direccion = `${url}/api/ActividadesPSP?idUsuario=${idUsuario}&buscarProyecto=1`;

    await fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(proyectos => selectProyecto(proyectos));
}

function selectProyecto(proyectos) {
    proyectos.forEach(proyecto => {
        const { nombre, idProyecto } = proyecto;

        const option = document.createElement('option');
        option.value = idProyecto;
        option.textContent = nombre;
        proyectosSelect.appendChild(option);

    })

    obtenerDatosActividad();
}

async function obtenerDatosActividad() {
    const direccion = `${url}/api/ActividadesPSP?idUsuario=${idUsuario}&idTiempoPSP=${idTiempoPSP}`;

    await fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(proyectos => llenarCampos(proyectos))
}

function llenarCampos(actividad) {

    eliminarSpinner();

    descripcionInput.value = actividad[0].descripcion;
    fechaHoraInicioInput.value = actividad[0].fechaHoraInicio;
    fechaHoraFinalInput.value = actividad[0].fechaHoraFinal;

    if (actividad[0].idProyecto != null) {
        proyectosSelect.value = actividad[0].idProyecto;
    } else {
        proyectosSelect.value = 0;
    }
}

function regresar(){
    window.location.href = ('./MenuActividades.html');
}


function mostrarSpinner() {

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    formulario.appendChild(spinner);
}

function eliminarSpinner() {
    const spinner = document.querySelector('.spinner');

    formulario.removeChild(spinner);
}