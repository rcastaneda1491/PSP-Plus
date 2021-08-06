
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


document.addEventListener('DOMContentLoaded',() => {
  const stringJWT = Cookies.get('jwt');
  let jwt;
  
  if (stringJWT) {
    jwt = parseJwt(stringJWT);

    if (jwt.rol="Administrador")
    {
      document.querySelector("#header").innerHTML=`
      <nav class="navbar navbar-expand-sm   ">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#opciones">
       <img src="../Navbar/menu.png"class="navh">
      </button>
      
      <!-- logo -->
      <a class="navbar-brand" href="#">
        <img src="../Navbar/LOGOPLUSTI 2.png" width="75" height="30" alt="">
      </a>
      
      <!-- enlaces -->
      <div class="collapse navbar-collapse" id="opciones">   
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <a class="nav-link" href="#">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Actividades</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Proyectos</a>
          </li>  
          <li class="nav-item">
            <a class="nav-link" href="#">Recordatorios</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Equipos de trabajo</a>
          </li>          
        </ul>
       
      </div>
      <div >
      

      <a class="nav-link" href="#"><img src="../Navbar/Vector.png"></a>
      </li>
      </div>
      
    </nav>
    `
    }
    else
    {
      document.querySelector("#header").innerHTML=`
      <nav class="navbar navbar-expand-sm   ">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#opciones">
       <img src="../Navbar/menu.png"class="navh">
      </button>
      
      <!-- logo -->
      <a class="navbar-brand" href="#">
        <img src="../Navbar/LOGOPLUSTI 2.png" width="75" height="30" alt="">
      </a>
      
      <!-- enlaces -->
      <div class="collapse navbar-collapse" id="opciones">   
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <a class="nav-link" href="#">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Actividades</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Proyectos</a>
          </li>  
          <li class="nav-item">
            <a class="nav-link" href="#">Recordatorios</a>
          </li>
                
        </ul>
       
      </div>
      <div >

      <a class="nav-link" href="#"><img src="../Navbar/Vector.png"></a>
      </li>
      </div>
      
    </nav>
    `
    }
  }
  else
  {

 
  

    document.querySelector("#header").innerHTML=`
    <nav class="navbar navbar-expand-sm   ">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#opciones">
     <img src="../Navbar/menu.png"class="navh">
    </button>
    
    <!-- logo -->
    <a class="navbar-brand" href="#">
      <img src="../Navbar/LOGOPLUSTI 2.png" width="75" height="30" alt="">
    </a>
    
    <!-- enlaces -->
    <div class="collapse navbar-collapse" id="opciones">   
      <ul class="navbar-nav">
        
        <li class="nav-item">
          <a class="nav-link" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Actividades</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Proyectos</a>
        </li>  
        <li class="nav-item">
          <a class="nav-link" href="#">Recordatorios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Equipos de trabajo</a>
        </li>          
      </ul>
     
    </div>
    <div >
    <a class="nav-link" href="#">Login</a>
    </li>
    </div>
    
  </nav>
  `
    
    ;
  }
})