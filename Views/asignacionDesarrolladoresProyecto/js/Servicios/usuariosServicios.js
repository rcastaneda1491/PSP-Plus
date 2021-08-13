const requestUrl = `${URL}/ComboDesarrolladores`
const headers = {
  'Accept' : "application/json",
  "Content-Type": "application/json",
  'Authorization': 'Bearer ' + stringJWT
};


const usuarioService = {
    getUsuarios() {
      return fetch(requestUrl, {
        method: "GET",
        headers
      }).then((response) => response.json());
    },
  };