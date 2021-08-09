const requestUrl = `${URL}/AgregarUsuarios`
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
const usuarioService = {
    getUsuarios() {
      return fetch(requestUrl, {
        method: "GET",
        headers: new Headers({
          'Authorization': 'Bearer ' + stringJWT
      })
      }).then((response) => response.json());
    },
  };
