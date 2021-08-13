const request = `${URL_Global}/usuariosProyectos`
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

const headers = {
    'Accept' : "application/json",
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + stringJWT
  };
const usuariosProyectoService = {
  getusuariosProyecto(idProyecto) {
    return fetch(`${request}/${idProyecto}`, {
      method: "GET",
      headers
    }).then((response) => console.log(response));
  },
  deleteUsuariosProyecto(body) {
    return fetch(request, {
      method: "DELETE",
      headers,
      body: JSON.stringify(body)
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

const obtenerProyecto = async idProyecto => {
  try {
    const resultado = await fetch(`${request}/proyecto/${idProyecto}`);
    const proyecto= await resultado.json();
    return proyecto;
  } catch (error) {
    console.log(error);
  }
}