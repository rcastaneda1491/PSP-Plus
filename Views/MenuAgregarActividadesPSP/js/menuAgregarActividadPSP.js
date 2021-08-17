/// DOCUMENTO RELIZADO POR: Erick Eduardo Echeverría Garrido (EE) 16/08/2021 

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

let actividad = getParameterByName('actividad'); // Variables que me serviran para evaluar si se desea
let error = getParameterByName('error');            // ingresar un error o una actividad

// SELECTORES
const btnAgregarActividadxCronometro = document.querySelector('.agregarXCronometro');
const btnAgregarActividadxDatos = document.querySelector('.agregarXDatos');


window.onload = () => {
    btnAgregarActividadxCronometro.addEventListener('click', crearActividadxCronometro);
    btnAgregarActividadxDatos.addEventListener('click', crearActividadxDatos);
}



function crearActividadxCronometro() {
    if(actividad == "1"){
        window.location.href = ('./AgregarActividadxCronometro.html');
    }else{
        window.location.href = ('./AgregarErrorxCronometro.html');
    }
    
}

function crearActividadxDatos(){
    if(actividad == "1"){
        window.location.href = ('../ActividadesPSP/AgregarActividad.html');
    }else{
        window.location.href = ('../ErroresPSP/AgregarError.html');
    }
    
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