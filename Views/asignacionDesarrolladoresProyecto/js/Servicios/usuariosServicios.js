const requestUrl = `${URL}/AgregarUsuarios`

const usuarioService = {
    getUsuarios() {
      return fetch(requestUrl, {
        method: "GET",
      }).then((response) => response.json());
    },
  };
