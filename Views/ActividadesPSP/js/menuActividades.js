// DOCUMENTO RELIZADO POR: Erick Eduardo Echeverría Garrido (EE) 5/08/2021 

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

let url = 'https://localhost:44368';

// SELECTORES
const formulario = document.querySelector('#formulario');
const actividadesForm = document.querySelector('#actividades');

const alerta = document.querySelector('#alert');

const btnAgregarActividad = document.querySelector('.boton-agregarActividad');
const proyectosSelect = document.querySelector('#proyectos-listado');

const tituloProyecto = document.querySelector('.tituloProyecto');
const tiempoProyecto = document.querySelector('#tiempoProyecto');

window.onload = () => {
    btnAgregarActividad.addEventListener('click', crearActividad);
    proyectosSelect.addEventListener('change', filtrarActividades);

    obtenerProyectos();
}

function filtrarActividades() {

    eliminarActividades();

    if (proyectosSelect.value == '0') {
        tituloProyecto.textContent = 'Proyecto: -------';
        alerta.style.display = 'none';
        cargarActividades();
    } else {

        if (proyectosSelect.value == 'SinProyecto') {
            tituloProyecto.textContent = 'Ningún Proyecto relacionado';
            alerta.style.display = 'none';
            cargarActividadesFiltrado();
        } else {
            tituloProyecto.textContent = 'Proyecto: ' + proyectosSelect.options[proyectosSelect.selectedIndex].textContent;
            alerta.style.display = 'none';
            cargarActividadesFiltrado();
        }
    }
}

async function cargarActividadesFiltrado() {

    mostrarSpinner();

    let direccion;

    if (proyectosSelect.value == 'SinProyecto') {
        direccion = `${url}/api/ActividadesPSP?idUsuario=${idUsuario}&actividadesSinProyecto=1`;
    } else {
        direccion = `${url}/api/ActividadesPSP?idUsuario=${idUsuario}&idProyecto=${proyectosSelect.value}`;
    }

    await fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(actividades => imprimirActividades(actividades))
}

function eliminarActividades() {
    const actividades = document.querySelector('#actividades');

    while (actividades.firstChild) {
        actividades.removeChild(actividades.firstChild);
    }
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
        .then(proyectos => selectProyecto(proyectos))
}

function selectProyecto(proyectos) {

    eliminarSpinner();

    proyectos.forEach(proyecto => {
        const { nombre, idProyecto } = proyecto;

        const option = document.createElement('option');
        option.value = idProyecto;
        option.textContent = nombre;
        proyectosSelect.appendChild(option);

    });

    cargarActividades();
}

async function cargarActividades() {
    mostrarSpinner();

    const direccion = `${url}/api/ActividadesPSP?idUsuario=${idUsuario}`;

    await fetch(direccion, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => resultado)
        .then(actividades => imprimirActividades(actividades))
}

function imprimirActividades(actividades) {

    if (actividades.length == 0) {
        alerta.style.display = 'block';
    } else {
        alerta.style.display = 'none';
    }

    eliminarSpinner();

    actividades.forEach(actividad => {
        const { idTiempoPsp, fechaHoraInicio, fechaHoraFinal, descripcion, idProyecto, idUsuario } = actividad;

        var fechaInicioSplit = fechaHoraInicio.split("T");
        let fechaInicio = fechaInicioSplit[0];
        var HoraInicioSplit = fechaInicioSplit[1].split(":00");
        let horaInicio = HoraInicioSplit[0];

        var fechaFinalSplit = fechaHoraFinal.split("T");
        let fechaFinal = fechaFinalSplit[0];
        var HoraFinalSplit = fechaFinalSplit[1].split(":00");
        let horaFinal = HoraFinalSplit[0];

        if (horaInicio.indexOf(':') == -1) {
            horaInicio = horaInicio + ':00';
        };

        if (horaFinal.indexOf(':') == -1) {
            horaFinal = horaFinal + ':00';
        };

        restarHoras(fechaHoraInicio, fechaHoraFinal);
       

        actividadesForm.innerHTML += `
        <div class="actividad">
            <img src="./img/separadorActividad.png">
            <h3>${descripcion}</h3>
            <a onclick="eliminarActividad(${idTiempoPsp})" ><img id="eliminar" src="./img/eliminar.png"></a>
            <a href="./EditarActividad.html?actividad=${idTiempoPsp}"><img id="editar" src="./img/editar.png"></a>
            <h5>${horaFinal}</h5>
            <h4>${fechaFinal}</h4>
            <h4>a</h4>
            <h5>${horaInicio}</h5>
            <h4>${fechaInicio}</h4>
            
        </div>
        `;
    })

    calcularHoras();

}

function calcularHoras() {
    let totalHoras = (Number(sumaDeMinutos) / 60).toFixed(2);

    tiempoProyecto.textContent = 'Tiempo Invertido: ' + totalHoras + ' hrs';

    sumaDeMinutos = 0;
}

let sumaDeMinutos = 0;

function restarHoras(horaInicio, horaFinal) {

    let a = moment(horaFinal);//now
    let b = moment(horaInicio);

    sumaDeMinutos = sumaDeMinutos + parseInt(a.diff(b, 'minutes')); // 44700

}


async function eliminarActividad(idActividad) {
    const confirmar = confirm('¿ Desea eliminar la actividad ?');

    if (confirmar) {

        const direccion = `${url}/api/ActividadesPSP?idTiempoPSP=${idActividad}`;

        await fetch(direccion, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)
            .then(resultado => {
            })

        alert('Elimando Exitosamente');

    }

    location.reload();
}

function crearActividad() {
    window.location.href = ('./AgregarActividad.html');
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
