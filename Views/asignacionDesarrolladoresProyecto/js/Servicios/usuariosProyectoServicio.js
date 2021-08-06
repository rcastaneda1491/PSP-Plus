const request = `${URL}/usuariosProyectos`

const usuariosProyectoService = {
  getusuariosProyecto() {
    return fetch(request, {
      method: "GET",
    }).then((response) => response.json());
  },
  deleteUsuariosProyecto(idEmpresa) {
    return fetch(request, {
      method: "DELETE",
      headers,
      body: JSON.stringify({idEmpresa: idEmpresa})
    }).then((response) => response.json());
  },
  saveUsuariosProyecto(body) {
    console.info(body);
    return fetch(request, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => response.json());
  },
};
