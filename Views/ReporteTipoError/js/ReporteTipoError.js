
//Roberto González
const cardListElement = document.getElementById("lista-erroesp");
const alerta = document.querySelector('#alert');
const inputproyecto = document.querySelector('#equipo');

 


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
    document.querySelector("#export-excel").addEventListener("click", () => {
        tableToExcel('Reporte', 'W3C Example Table')
    })
    document.querySelector("#export-pdf").addEventListener("click", () => {

 

        var element = document.querySelector('#Reporte');

 

        html2pdf()
            .set({
                margin: 1.2,
                filename: 'Actividades' + Date.now() + '.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'landscape' // landscape o portrait
                }
            })
            .from(element)
            .save()
            .catch(err => console.log(err));

 

    })
    getProyectos();
}

 

async function getProyectos() {
    const url = `https://172.30.236.13:8082/api/ReporteTipoError`;

 

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
    document.getElementById("lista-erroesp").innerHTML = "";

 

    datos.forEach(proyectos => {
         
        
        const card = `
            <tr>
              <td>${proyectos.solucion}</td>
              <td>${proyectos.tipoError}</td>
              <td>${proyectos.introducido}</td>
              <td>${proyectos.eliminado}</td>
              <td>${proyectos.fechaHoraInicio.split("T")[0]}</td>
              <td>${proyectos.fechaHoraFinal.split("T")[0]}</td>
              <td>${proyectos.idProyecto}</td>
            </tr>
        `;
        cardListElement.innerHTML += card;
    })

 

}

 

async function GetDatos() {
    if(inputproyecto.value== 0){
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 3000);
    }else{
    const url = `https://172.30.236.13:8082/api/ReporteTipoError?tipoerror=${inputproyecto.value}`;

 

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
}
















