const cardlistelement = document.getElementById("lista-proyectos");

window.onload = () => {
    getdatos();
}

async function getdatos() {
    const url = `https://localhost:44368/api/ProyectoAdmin`;

    await fetch(url, {
            headers: new Headers({
                //'Authorization': 'Bearer ' + stringJWT
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
        <div class="col">
          <div class="card">
            <div class="card-body">            
              <h4 class="card-title"">${proyecto.dev} | ${proyecto.nombre}</h4>
              <p id="descripcionn">${proyecto.descripcion}</p>
              <p>Cliente: ${proyecto.cliente}</p>
              <p>Fecha Inicio Esperada: ${fechainicioesperada}</p>
              <p>Fecha Inicio Real: ${fechainicioreal}</p>
              <p>Fecha Final Esperada: ${fechafinalesperada}</p>
              <p>Fecha Final Real: ${fechafinalreal}</p>
              <p>Total Horas: ${proyecto.totalHorasTrabajadas} hrs</p>
              <div><a class="edit" id="editar" data-id="${proyecto.idProyecto}">
              
                    <img class="eliminar-editar" src="./img/Editar.svg" id="imgeditar" alt="" style=" width: 35px;">
                </a>
                <a class="delete" id="eliminar" data-id="${proyecto.idProyecto}">
                    <img class="eliminar-editar" src="./img/Eliminar.svg" id="imgeliminar" alt="" style=" width: 25px;">
                </a>
                </div>
              <button class="btn desarrollador" id="boton-verdesarrollador" data-id="${proyecto.idProyecto}"> Desarrolladores </button>
            </div>
          </div>
        </div> 
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

    var elements2 = document.getElementsByClassName("desarrollador");

    for (var i = 0; i < elements2.length; i++) {
        elements2[i].addEventListener('click', verDesarrollador);
    }
}

function verDesarrollador(e) {
    const proyecto = e.target.parentElement.parentElement;
    const proyectoid = proyecto.querySelector('a').getAttribute('data-id');

    window.location.href = (`../asignacionDesarrolladoresProyecto/desarrolladores.html?idProyecto=${proyectoid}`);
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
        getdatos();


    } else {

        return;

    }

}