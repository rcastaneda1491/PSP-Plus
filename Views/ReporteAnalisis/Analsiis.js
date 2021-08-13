
//Albin Cordero 

document.addEventListener('DOMContentLoaded', () => {
const bt = document.querySelector("#btn");
    const inicio = document.querySelector("#inicio")
    const fn = document.querySelector("#fin")
     const pdf= document.querySelector("#pdf")
     
     const ex = document.querySelector("#xlsx")
     const msg = document.querySelector("#alert")
     pdf.hidden=true;
     ex.hidden=true;
     msg.hidden=true;

     ex.addEventListener('click',() =>
     {
        tableToExcel('Reporte', 'W3C Example Table')
     })
     pdf.addEventListener('click',() => {
 
 
        var element = document.querySelector('#Reporte');
       
        html2pdf()
    .set({
        margin: 1.2,
        filename: 'Analisis'+Date.now()+'.pdf',
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
            orientation: 'portrait' // landscape o portrait
        }
    })
    .from(element)
    .save()
    .catch(err => console.log(err));

   
     })
  inicio.addEventListener('change',() => {

    fn.setAttribute("min",inicio.value)
  })
  fn.addEventListener('change',() => {

    inicio.setAttribute("max",fn.value)
  })
  bt.addEventListener('click',() => {
    jwt = parseJwt(stringJWT);
    console.log(jwt.rol) 
    if(jwt.rol=="administrador"){
        const sel = document.querySelector("#select");
            console.log(sel.value)
        if(inicio.value=="" || fin.value=="" || sel.value=="null" )
        {
            document.querySelector("#alert").hidden=false;
    document.querySelector("#alert").innerHTML="Todos Los Campos Son Requeridos para la busqueda"
    setTimeout(() => {
        msg.hidden=true;
    }, 3000);
        }
        else
        {
            pdf.hidden=false;
            ex.hidden=false;
            let fnn= String(inicio.value) + ' 00:00:00';
        let inn= String(fin.value) + ' 23:59:59';
        
       
       
        
            
            
            const url = `https://localhost:44368/api/Reporte_Analisis/${sel.value},${fnn},${inn}`;
            cargar(url);
        
         
    
        }
       
    }
     
    if(jwt.rol=="desarrollador")
    {
        if(inicio.value=="" || fin.value=="")
    {
        document.querySelector("#alert").hidden=false;
document.querySelector("#alert").innerHTML="Todos Los Campos Son Requeridos para la busqueda"
setTimeout(() => {
    msg.hidden=true;
}, 3000);
    }
    else
    {
        pdf.hidden=false;
        ex.hidden=false;
        let fnn= String(inicio.value) + ' 00:00:00';
    let inn= String(fin.value) + ' 23:59:59';
    
   
   
     
        const url = `https://localhost:44368/api/Reporte_Analisis/${jwt.sub},${fnn},${inn}`;
        cargar(url);
     
     

    }
    }

    

} )
})


async function  cargar(url) {
    await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + stringJWT
        })
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
           mostrar(resultado);
        })
}


function mostrar(reporte) {
   
   const lista= document.querySelector("#datos");
   lista.innerHTML=""
  if(reporte.length>0)
  {
    reporte.forEach(re => {
        const {proyecto,inicio,fin,tiempo,tareas} = re
        lista.innerHTML +=`<tr> <td>${proyecto}</td> <td>${inicio.split('T')[0]}</td> <td>${fin.split('T')[0]}</td> <td>${tiempo.toFixed(2)} Hrs</td> <td>${tareas}</td>  </tr>`;
      });
  }
  else
  {
    lista.innerHTML +=`<tr> <td colspan="5"> Sin Resultados entre las fechas seleccionadas </td> </tr>`;

  }
}

 