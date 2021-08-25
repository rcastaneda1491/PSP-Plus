//Albin Cordero session time 
var time;
let restante=200000;

document.addEventListener('DOMContentLoaded', () => {
    const url = `https://172.30.236.13:8082/api/Parametros`;

    fetch(url, {
         headers: new Headers({
             'Authorization': 'Bearer ' + Cookies.get('jwt')
         })
     })
         .then(respuesta => respuesta.json())
         .then(resultado => {
             
            const { inactividad } = resultado;
            restante=inactividad;
            restante= restante*60*1000;//calculo de tiempo que tiene de session out

           
         })
    inactivityTime()
});

var inactivityTime = function () {
   
    
    document.onload = resetTimer;
document.onmousemove = resetTimer;
document.onmousedown = resetTimer; // touchscreen presses
document.ontouchstart = resetTimer;
document.onclick = resetTimer;     // touchpad clicks
document.onscroll = resetTimer;    // scrolling with arrow keys
document.onkeypress = resetTimer;

    function logout() {
        alert("Su sesion ha finalizado , por inactivdad ")
        Cookies.remove("jwt");
      location.reload();
    }

    function resetTimer() {

        
            clearTimeout(time);
            time = setTimeout(logout, restante)
        
        
    }
};



 