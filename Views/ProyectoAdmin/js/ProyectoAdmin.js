const cardlistelement = document.getElementById("lista-proyectos");
const alerta = document.querySelector('#alert');
const inpuntsearch = document.querySelector('#search');


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
    getdatos();
}

async function getdatos() {
    const url = `https://localhost:44368/api/ProyectoAdmin`;

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrardatos(resultado);
        })
}

function mostrardatos(datos) {
    datos.forEach(proyecto => {
        var fechaSplit1 = proyecto.fechaInicioEsperada.split("T");
        var fechainicioesperada = fechaSplit1[0];
        var fechaSplit2 = proyecto.fechaFinalEsperada.split("T");
        var fechafinalesperada = fechaSplit2[0];

        if (proyecto.fechaInicioReal == null) {
            var fechainicioreal = "";
        } else {
            var fechaSplit3 = proyecto.fechaInicioReal.split("T");
            var fechainicioreal = fechaSplit3[0];
        }
        if (proyecto.fechaFinalReal == null) {
            var fechafinalreal = "";
        } else {
            var fechaSplit4 = proyecto.fechaFinalReal.split("T");
            var fechainicioreal = fechaSplit4[0];
        }

        const card = `


        <tr>
              <td>${proyecto.idProyecto}</td>
              <td>${proyecto.nombre}</td>
              <td>${proyecto.cliente}</td>
              <td>${fechainicioesperada}</td>
              <td>${fechainicioreal}</td>
              <td>${fechafinalesperada}</td>
              <td>${fechafinalreal}</td>
              <td>${proyecto.dev}</td>
              <td>${proyecto.totalHorasTrabajadas}</td>
              
              <td><a class="edit" id="editar" data-id="${proyecto.idProyecto}">
                    <img class="eliminar-editar" src="./img/Editar.svg" id="imgeditar" alt="" style=" width: 35px;">
                    </a></td>
              <td><a class="delete" id="eliminar" data-id="${proyecto.idProyecto}">
                    <img class="eliminar-editar" src="./img/Eliminar.svg" id="imgeliminar" alt="" style=" width: 25px;">
                </a></td>
              <td><button class="btn dev"  data-id="${proyecto.idProyecto}"> Desarrolladores </button></td>
            </tr>
       `;
        cardlistelement.innerHTML += card;
    });

    var elements = document.getElementsByClassName("edit");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', modificarProyecto);
    }

    var elements2 = document.getElementsByClassName("delete");

    for (var i = 0; i < elements2.length; i++) {
        elements2[i].addEventListener('click', eliminarProyecto);
    }

   // var elements3 = document.getElementsByClassName("desarrollador");

    //for (var i = 0; i < elements3.length; i++) {
//        elements3[i].addEventListener('click', verDesarrollador);
  //  }

  var elementdesarrollador = document.getElementsByClassName("dev");
    for (var i = 0; i < elementdesarrollador.length; i++) {
      elementdesarrollador[i].addEventListener('click', verDesarrollador);
    }
}



function modificarProyecto(e) {
    const proyecto = e.target.parentElement.parentElement;
    const proyectoid = proyecto.querySelector('a').getAttribute('data-id');

    window.location.href = (`./ProyectoAdmin-Editar.html?proyectoId=${proyectoid}`);
}

async function eliminarProyecto(e) {
    const proyecto = e.target.parentElement.parentElement;
    const proyectoid = proyecto.querySelector('a').getAttribute('data-id');
    const confirmar = confirm('¿Desea Eliminar Proyecto?');
    if (confirmar) {

        const url = `https://localhost:44368/api/ProyectoAdmin?idproyecto=${proyectoid}`;

        await fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)

        window.location.href = (`./ProyectoAdminindex.html`);


    } else {

        return;

    }

}

function verDesarrollador(e) {
    const proyecto = e.target.parentElement.parentElement;
    const proyectoid = proyecto.querySelector('BUTTON').getAttribute('data-id');

   window.location.href = (`../asignacionDesarrolladoresProyecto/desarrolladores.html?idProyecto=${proyectoid}`);
}


async function searchCursos() {
    document.getElementById('alert').style.display = 'none';
    if (inpuntsearch.value == "") {
        document.getElementById("lista-proyectos").innerHTML = "";
        getdatos();
    }
    else {
        document.getElementById("lista-proyectos").innerHTML = "";
        const url = `https://localhost:44368/api/GetProyectosBusqueda?nombreProyecto=${inpuntsearch.value}`;
        await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })

            .then(respuesta => respuesta.json())
            .then(resultado => {
                mostrardatos(resultado);
                if (Object.keys(resultado).length == 0) {
                    document.getElementById('alert').style.display = 'block';
                } else {

                    document.getElementById('alert').style.display = 'none';
                }
            })
    }
}