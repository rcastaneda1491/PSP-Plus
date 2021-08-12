const inputidUsuario = document.querySelector('#idusuario');
const inputNombre = document.querySelector('#nombre');


const inpuntsearch = document.querySelector('#search');


const array = ["---Seleccione una opcion---"];
const array2 = [0];


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
    getProyectos();
}


async function getProyectos() {
    var url;
    if(jwt.rol == "desarrollador"){
        url = `https://localhost:44368/api/ReporteErroresProyecto?idUsuario=2`;
    }else if(jwt.rol == "administrador"){
        url = `https://localhost:44368/api/ReporteErroresProyecto?idUsuario=1`;
    }
    

    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            llenararreglo(resultado);
        })
}


function llenararreglo(datos) {
    datos.forEach(proyectos => {
        array.push(proyectos.nombre)
        array2.push(proyectos.idProyecto)
    })

    cargar();
}


function cargar() {

    var select = document.getElementById("equipo");

    for (var i = 0; i < array.length; i++) {
        option = document.createElement("option");
        option.value = array2[i];
        option.text = array[i];
        select.appendChild(option);
    }
}


async function searchCursos() {
    //document.getElementById('alert').style.display = 'none';
    if (inpuntsearch.value == "") {
        document.getElementById("lista-erroesp").innerHTML = "";
        GetDatos();
    }
    else {
        document.getElementById("lista-erroesp").innerHTML = "";
        const url = `https://localhost:44368/api/EquipoDesarrolloNombre?correo=${inpuntsearch.value}`;
        await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + stringJWT
            })
        })

            .then(respuesta => respuesta.json())
            .then(resultado => {
                mostrarDatos(resultado);
                if (Object.keys(resultado).length == 0) {
                    document.getElementById('alert').style.display = 'block';
                } else {

                    document.getElementById('alert').style.display = 'none';
                }
            })
    }
}