const requestUrl = `${URL}/reporteActividadDesarrollador`

   async function obtenerActividades(idUsuario, fechaInicio, fechaFinal)  {
    try {
      const resultado = await fetch(`${requestUrl}/${idUsuario},${fechaInicio},${fechaFinal}`);
      const actividades = await resultado.json();
      console.log(actividades);
      return actividades;
    } catch (error) {
      console.log(error);
    }
  }


 