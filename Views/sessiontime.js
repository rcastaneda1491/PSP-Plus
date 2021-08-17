//Albin Cordero session time 
var time;
window.onload = function() {
    inactivityTime(); 
  }


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
      
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 1200000)
        
        
    }
};