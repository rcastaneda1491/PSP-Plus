/*
    Desarrollador: Rogelio Raúl Castañeda Flores
*/
const selectDev = document.getElementById("select-dev");
const selecProject = document.getElementById("select-project");
const cardListElement = document.getElementById("lista-errores");
const devContainer = document.getElementById("dev-container");
const searchButton = document.getElementById("editar");
const alertDiv = document.getElementById("alert");

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
    searchButton.style.visibility = "hidden";
    if (jwt.rol == "administrador") {
        fillSelectDev();
    } else if (jwt.rol == "desarrollador") {
        devContainer.style.display = "none";
        cargarProyectos();
    }
}

function setDevOptions(usuarios) {
    selectDev.innerHTML = "";
    let selectHtml =
        '<option selected value="">--- Seleccione un desarrollador ---</option>';
    usuarios.forEach((usuario) => {
        selectHtml += `<option value="${usuario.idUsuario}">${usuario.nombres} ${usuario.apellidos}</option>`;
    });
    selectDev.innerHTML = selectHtml;
};

async function fillSelectDev() {
    const url = `https://localhost:44368/api/ComboDesarrolladores`;

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            setDevOptions(resultado);
        })
};

function validarAccion() {

    if (selecProject.value != "") {
        searchButton.style.visibility = "visible";
    } else {
        if (searchButton.style.visibility == "visible") {
            searchButton.style.visibility = "hidden";
        } else {
            searchButton.style.visibility = "visible";
        }
    }
}

async function cargarProyectos() {
    $("#select-project").find('option').remove();
    if (jwt.rol == "administrador") {
        if (selectDev.value != "") {
            const url = `https://localhost:44368/api/ComboProyectos?idUsuario=${selectDev.value}`;

            await fetch(url, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + stringJWT
                })
            })
                .then(respuesta => respuesta.json())
                .then(resultado => {
                    setProjectOptions(resultado);
                })
        } else {
            searchButton.style.visibility = "hidden";
        }
    } else if (jwt.rol == "desarrollador") {
        const url = `https://localhost:44368/api/ComboProyectos?idUsuario=${jwt.sub}`;

        await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta.json())
            .then(resultado => {
                setProjectOptions(resultado);
            })
    }
};

function setProjectOptions(proyectos) {
    selecProject.innerHTML = "";
    let selectHtml =
        '<option selected value="">--- Seleccione un proyecto ---</option>';
    proyectos.forEach((proyecto) => {
        selectHtml += `<option value="${proyecto.idProyecto}">${proyecto.nombre}</option>`;
    });
    selecProject.innerHTML = selectHtml;
};

function BusquedaReporte() {
    if (jwt.rol == "administrador") {
        if (selectDev.value == "" || selecProject.value == "") {
            alertDiv.textContent = "Ingrese todos los datos"
            alertDiv.style.display = 'block';
            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 3000);
        } else {
            GetDatos();
        }
    } else if (jwt.rol == "desarrollador") {
        if (selecProject.value == "") {
            alertDiv.textContent = "Ingrese todos los datos"
            alertDiv.style.display = 'block';
            setTimeout(() => {
                alertDiv.style.display = 'none';
            }, 3000);
        } else {
            GetDatos();
        }
    }
}

async function GetDatos() {
    var url;
    if (jwt.rol == "administrador") {
        url = `https://localhost:44368/api/ReporteErroresDesarrolladorProyecto?idProyecto=${selecProject.value}&idUsuario=${selectDev.value}`;
    } else if (jwt.rol == "desarrollador") {
        url = `https://localhost:44368/api/ReporteErroresDesarrolladorProyecto?idProyecto=${selecProject.value}&idUsuario=${jwt.sub}`;
    }

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
    document.getElementById("lista-errores").innerHTML = "";

    datos.forEach(error => {
        var fechaInicioSplit = error.fechaHoraInicio.split("T");
        var fechaInicio = fechaInicioSplit[0];
        var horaInicio = fechaInicioSplit[1];

        var fechaFinSplit = error.fechaHoraInicio.split("T");
        var fechaFin = fechaFinSplit[0];
        var horaFin = fechaFinSplit[1];

        var tiempoHoras = (error.tiempoCorrecion / 60).toFixed(2);;

        const card = `
            <tr>
              <td>${error.correlativo}</td>
              <td>${error.descripcion}</td>
              <td>${error.solucion}</td>
              <td>${fechaInicio} ${horaInicio}</td>
              <td>${fechaFin} ${horaFin}</td>
              <td>${error.tipoError}</td>
              <td>${error.introducido}</td>
              <td>${error.eliminado}</td>
              <td>${tiempoHoras}</td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })
}