const inputNombre = document.querySelector('#nombre');
const inputDescripcion = document.querySelector('#descripcion');
const inputCliente = document.querySelector('#cliente');
const inputFechaInicioEsperada = document.querySelector('#fechainicioesperada');
const inputFechaFinalEsperada = document.querySelector('#fechafinalesperada');
const inputDev = document.querySelector('#dev');

const alerta = document.querySelector('#alert');
const exitoso = document.querySelector('#guardado');


async function agregarProyecto() {
    const url = `https://localhost:44368/api/ProyectoAdmin?nombre=${inputNombre.value}&descripcion=${inputDescripcion.value}&cliente=${inputCliente.value}&fechainicioesperada=${inputFechaInicioEsperada.value}&fechafinalesperada=${inputFechaFinalEsperada.value}&dev=${inputDev.value}`;

    await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })
        .then(respuesta => respuesta)

}

function validar() {
    if (inputNombre.value == "" || inputDescripcion.value == "" || inputCliente.value == "" || inputFechaInicioEsperada.value == "" || inputFechaFinalEsperada.value == "" || inputDev.value == "") {
        alerta.style.display = 'block';

        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);

        return;
    } else {

        agregarProyecto();
        exitoso.style.display = 'block';
        inputNombre.value = "";
        inputDescripcion.value = "";
        inputCliente.value = "";
        inputFechaInicioEsperada.value = "";
        inputFechaFinalEsperada.value = "";
        inputDev.value = "";

        setTimeout(() => {
            exitoso.style.display = 'none';
        }, 3000);

        window.location.href = (`./ProyectoAdminindex.html`);
    }

}