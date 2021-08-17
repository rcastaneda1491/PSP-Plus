// DOCUMENTO RELIZADO POR: Erick Eduardo Echeverría Garrido (EE)

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

// SELECTORES
const alerta = document.querySelector('#alert');
const alertaFechasIncorrectas = document.querySelector('#alert2');

const formulario = document.querySelector('#formulario');
const descripcionInput = document.querySelector('#descripcion');
const solucionInput = document.querySelector('#solucion');
const correlativoInput = document.querySelector('#correlativo');
const tipoErrorSelect = document.querySelector('#tipoErrores-listado');
const etapasIntroducidoSelect = document.querySelector('#etapasIntroducido-listado');
const etapasEliminadoSelect = document.querySelector('#etapasEliminado-listado');
const lenguajeInput = document.querySelector('#lenguaje');
const proyectosSelect = document.querySelector('#proyectos-listado');

const btnIniciar = document.querySelector('#btnComenzar');
const btnDetener = document.querySelector('#btnDetener');
const btnFinalizar = document.querySelector('#btnFinalizar');

let tiempoCorrecion;

window.onload = () => {

    btnIniciar.addEventListener("click", tomarNotaFechaHoraInicio);
    btnDetener.addEventListener("click", tomarNotaFechaHoraInicio);
    btnFinalizar.addEventListener("click", tomarNotaFechaHoraInicio);

    obtenerProyectos();
    proyectosSelect.addEventListener("change", obtenerCorrelativo);
}

function obtenerCorrelativo(){

    if(proyectosSelect.value == '0'){
        correlativoInput.value = 1;

        return;
    }

    const direccion = `${URL_Global}/Errores?idProyecto=${proyectosSelect.value}`;

    fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(correlativo => mostrarCorrelativo(correlativo))
}
function mostrarCorrelativo(maxCorrelativo){
    correlativoInput.value = maxCorrelativo + 1;
}

async function obtenerProyectos() {
    const direccion = `${URL_Global}/ActividadesPSP?idUsuario=${idUsuario}&buscarProyecto=1`;

    await fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(proyectos => selectProyecto(proyectos))
}

function selectProyecto(proyectos) {
    proyectos.forEach(proyecto => {
        const { nombre, idProyecto } = proyecto;

        const option = document.createElement('option');
        option.value = idProyecto;
        option.textContent = nombre;
        proyectosSelect.appendChild(option);

    })
}

let fechaHoraInicio;
let fechaHoraFinal;

let estado = 0; // 0 significa que el conteo empezo y 1 que la proxima acción va a ser detenerse

function tomarNotaFechaHoraInicio() {

    if(estado == 0){
        fechaHoraInicio = new Date();
        btnIniciar.style.display = 'none';
        btnDetener.style.display = 'block';
        estado = 1;
    }else{

        if(fechaHoraFinal == null){
            fechaHoraFinal = new Date();
        }

        btnDetener.style.display = 'none';
        btnFinalizar.style.display = 'block';

        if (descripcionInput.value == '' || solucionInput.value == '' || correlativoInput.value == '' || tipoErrorSelect.value == '' || etapasIntroducidoSelect.value == '' || etapasEliminadoSelect.value == '' || lenguajeInput.value == '' || proyectosSelect.value == '') {
    
            alerta.style.display = 'block';
    
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 3000);
    
            return;    
        }
    
        agregarError();    
    }
}

async function agregarError() {

    mostrarSpinner();

    let direccion;

    // Armando la variable para tipo Date

    if(fechaHoraInicio.getMonth() < 10){
        if(fechaHoraInicio.getMinutes() < 10){
            fechaHoraInicio = fechaHoraInicio.getFullYear()+'-0'+(fechaHoraInicio.getMonth()+1)+'-'+fechaHoraInicio.getDate()+'T'+fechaHoraInicio.getHours()+':0'+fechaHoraInicio.getMinutes();
        }else{
            fechaHoraInicio = fechaHoraInicio.getFullYear()+'-0'+(fechaHoraInicio.getMonth()+1)+'-'+fechaHoraInicio.getDate()+'T'+fechaHoraInicio.getHours()+':'+fechaHoraInicio.getMinutes();
        }
    }else{
        if(fechaHoraInicio.getMinutes() < 10){
            fechaHoraInicio = fechaHoraInicio.getFullYear()+'-'+(fechaHoraInicio.getMonth()+1)+'-'+fechaHoraInicio.getDate()+'T'+fechaHoraInicio.getHours()+':0'+fechaHoraInicio.getMinutes();
        }else{
            fechaHoraInicio = fechaHoraInicio.getFullYear()+'-'+(fechaHoraInicio.getMonth()+1)+'-'+fechaHoraInicio.getDate()+'T'+fechaHoraInicio.getHours()+':'+fechaHoraInicio.getMinutes();
        }
    }

    if(fechaHoraFinal.getMonth() < 10){
        if(fechaHoraFinal.getMinutes() < 10){
            fechaHoraFinal = fechaHoraFinal.getFullYear()+'-0'+(fechaHoraFinal.getMonth()+1)+'-'+fechaHoraFinal.getDate()+'T'+fechaHoraFinal.getHours()+':0'+fechaHoraFinal.getMinutes();
        }else{
            fechaHoraFinal = fechaHoraFinal.getFullYear()+'-0'+(fechaHoraFinal.getMonth()+1)+'-'+fechaHoraFinal.getDate()+'T'+fechaHoraFinal.getHours()+':'+fechaHoraFinal.getMinutes();
        }
    }else{  
        if(fechaHoraFinal.getMinutes() < 10){
            fechaHoraFinal = fechaHoraFinal.getFullYear()+'-'+(fechaHoraFinal.getMonth()+1)+'-'+fechaHoraFinal.getDate()+'T'+fechaHoraFinal.getHours()+':0'+fechaHoraFinal.getMinutes();
        }else{
            fechaHoraFinal = fechaHoraFinal.getFullYear()+'-'+(fechaHoraFinal.getMonth()+1)+'-'+fechaHoraFinal.getDate()+'T'+fechaHoraFinal.getHours()+':'+fechaHoraFinal.getMinutes();
        }
    }

    calcularTiempoDeCorrecion();

    if (proyectosSelect.value == '0') {
        direccion = `${URL_Global}/Errores?fecha=${fechaHoraInicio}&descripcion=${descripcionInput.value}&solucion=${solucionInput.value}&correlativo=${correlativoInput.value}&tipoError=${tipoErrorSelect.value}&introducido=${etapasIntroducidoSelect.value}&eliminado=${etapasEliminadoSelect.value}&fechaHoraInicio=${fechaHoraInicio}&fechaHoraFinal=${fechaHoraFinal}&tiempoCorrecion=${tiempoCorrecion}&lenguaje=${lenguajeInput.value}&idUsuario=${idUsuario}`;
    } else {
        direccion = `${URL_Global}/Errores?fecha=${fechaHoraInicio}&descripcion=${descripcionInput.value}&solucion=${solucionInput.value}&correlativo=${correlativoInput.value}&tipoError=${tipoErrorSelect.value}&introducido=${etapasIntroducidoSelect.value}&eliminado=${etapasEliminadoSelect.value}&fechaHoraInicio=${fechaHoraInicio}&fechaHoraFinal=${fechaHoraFinal}&tiempoCorrecion=${tiempoCorrecion}&lenguaje=${lenguajeInput.value}&idProyecto=${proyectosSelect.value}&idUsuario=${idUsuario}`;
    }

    await fetch(direccion, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta)
        .then(resultado => {
        })

    alert('Agregado Exitosamente');
    window.location.href = (`../ActividadesPSP/MenuActividades.html`);
}










function calcularTiempoDeCorrecion(){

    debugger

    let a = moment(fechaHoraInicio);
    let b = moment(fechaHoraFinal);

    tiempoCorrecion = parseInt(b.diff(a, 'minutes'));

    console.log(tiempoCorrecion)
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