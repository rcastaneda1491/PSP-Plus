const request = `${URL}/usuariosProyectos`

const usuariosProyectoService = {
  getusuariosProyecto(idProyecto) {
    return fetch(`${request}/${idProyecto}`, {
      method: "GET",
      headers: new Headers({
        'Authorization': 'Bearer ' + stringJWT
    })
    }).then((response) => console.log(response));
  },
  deleteUsuariosProyecto(body) {
    return fetch(request, {
      method: "DELETE",
      headers: new Headers({
        'Authorization': 'Bearer ' + stringJWT
    }),
      body: JSON.stringify(body)
    }).then((response) => response.json());
  },
  saveUsuariosProyecto(body) {
    console.info(body);
    return fetch(request, {
      method: "POST",
      headers: new Headers({
        'Authorization': 'Bearer ' + stringJWT
    }),
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
};


 const obtenerUsuarios = async idProyecto => {
  try {
    const resultado = await fetch(`${request}/${idProyecto}`);
    const usuario = await resultado.json();
    //console.log(usuario);
    return usuario;
  } catch (error) {
    console.log(error);
  }
}