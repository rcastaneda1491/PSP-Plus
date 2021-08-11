/*Julio Garcia
9/08/2021*/
const cardListElement = document.getElementById("lista-recordatorios");
const exitoso = document.querySelector('#guardado');
const exitoso2 = document.querySelector('#editado');
const exitoso3 = document.querySelector('#eliminado');
const alerta = document.querySelector('#alert');

const urlParams = new URLSearchParams(window.location.search);
const val = urlParams.get('validar');
var eliminar = 0;

window.onload = () => {
    validacion();
    GetDatos();

}

function validacion() {
    if (val == 1) {

        exitoso.textContent = "Recordatorio Agregado Correctamente"
        exitoso.style.display = 'block';
        setTimeout(() => {
            exitoso.style.display = 'none';
        }, 3000);
    } else if (val == 2) {
        exitoso2.textContent = "Usuario Actualizado Correctamente"
        exitoso2.style.display = 'block';
        setTimeout(() => {
            exitoso2.style.display = 'none';
        }, 3000);

    } else if (val == null) {
        return;
    }
    setTimeout(() => {
        window.location.href = "./Recordatorios.html";
    }, 3000);
}


async function GetDatos() {
    if (eliminar == 1) {

        exitoso3.textContent = "Recordatorio Eliminado Correctamente"
        exitoso3.style.display = 'block';
        setTimeout(() => {
            exitoso3.style.display = 'none';
        }, 3000);

        eliminar = 0;
    }
    const url = `https://localhost:44368/api/Recordatorios?idUsuario=2`;

    await fetch(url, {
        headers: new Headers({
            //'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarDatos(resultado);
        })
}


function mostrarDatos(datos) {
    cardListElement.innerHTML = "";

    datos.forEach(recordatorio => {

        switch(recordatorio.tipoRecordatorio){
            case 1:
                var fechaSplit = recordatorio.fechaHoraRecordatorio.split("T");
                var fecha = fechaSplit[0];
                var hora = fechaSplit[1];
                const card = `
                <div class="row ">
                    <div class="col">
                        <div class="div"></div>
                        <img src="./img/Icon.svg" />
                        <p><b>${recordatorio.descripcion}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:center">
                        <img class="reloj" src="./img/reloj.svg" />
                        <p><b>${fecha} : ${hora}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:flex-end">
                        
                        <a class="delete" data-id="${recordatorio.idRecordatorios}"><img src="./img/delete.svg" class="imgdelete"  alt="delete" /></a>
                    </div>
                </div>
                `;
                cardListElement.innerHTML += card;
                break;
            case 2:
                const card2 = `
                <div class="row ">
                    <div class="col">
                        <div class="div"></div>
                        <img src="./img/Icon.svg" />
                        <p><b>${recordatorio.descripcion}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:center">
                        <img class="reloj" src="./img/reloj.svg" />
                        <p><b>Proyecto: ${recordatorio.nombreProyecto} - Horas Alcanzadas: ${recordatorio.horasAlerta}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:flex-end">
                        
                        <a class="delete" data-id="${recordatorio.idRecordatorios}"><img src="./img/delete.svg"  alt="delete" class="imgdelete"/></a>
                    </div>
                </div>
                `;
                cardListElement.innerHTML += card2;
                break;
            case 3:
                var fechaSplit = recordatorio.fechaHoraRecordatorio.split("T");
                var fecha = fechaSplit[0];
                var hora = fechaSplit[1];
                const card3= `
                <div class="row ">
                    <div class="col">
                        <div class="div"></div>
                        <img src="./img/Icon.svg" />
                        <p><b>${recordatorio.descripcion}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:center">
                        <img class="reloj" src="./img/reloj.svg" />
                        <p><b>Proyecto: ${recordatorio.nombreProyecto} - ${fecha} : ${hora}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:flex-end">
                        
                        <a class="delete" data-id="${recordatorio.idRecordatorios}"><img src="./img/delete.svg" alt="delete"  class="imgdelete"/></a>
                    </div>
                </div>
                `;
                cardListElement.innerHTML += card3;
                break;
            case 4:

                const card4= `
                <div class="row ">
                    <div class="col">
                        <div class="div"></div>
                        <img src="./img/Icon.svg" />
                        <p><b>${recordatorio.descripcion}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:center">
                        <img class="reloj" src="./img/reloj.svg" />
                        <p><b>Proyecto: ${recordatorio.nombreProyecto}</b></p>
                    </div>
                    <div class="col" style="display: flex; justify-content:flex-end">
                        
                        <a class="delete" data-id="${recordatorio.idRecordatorios}"><img src="./img/delete.svg" alt="delete" class="imgdelete"/></a>
                    </div>
                </div>
                `;
                cardListElement.innerHTML += card4;
                break;
        }
 

        
    })



    var elements2 = document.getElementsByClassName("delete");

    for (var i = 0; i < elements2.length; i++) {
        elements2[i].addEventListener('click', deleteRecordatorio);
    }

}


async function deleteRecordatorio(e) {
    const recordatorio = e.target.parentElement.parentElement;
    const recordatorioid = recordatorio.querySelector('a').getAttribute('data-id');
    const confirmar = confirm('¿Desea Eliminar Usuario?');
    if (confirmar) {

        const urlActualizarUsuario = `https://localhost:44368/api/Recordatorios?idRecordatorio=${recordatorioid}`;

        await fetch(urlActualizarUsuario, {
            method: 'DELETE',
            headers: new Headers({
                //'Authorization': 'Bearer ' + stringJWT
            })
        })
            .then(respuesta => respuesta)

        eliminar = 1;
        GetDatos();

    } else {

        return;

    }

}





