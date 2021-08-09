(function(){

        const listado = document.getElementById('lista-usuarios');
        const addButton = document.getElementById('buttonAdd');
        const alerta = document.getElementById('eliminado');
        let idProyect;
        
        listado.addEventListener('click', confirmacionEliminacion);
        addButton.addEventListener('click', addView);

        async function mostrarUsuarios(){
            const usuarios = await obtenerUsuarios(idProyect);
            console.info(usuarios);

            usuarios.forEach( element => {
                const {idUsuario, idProyecto, nombre, apellido, correo} = element;

                const row = document.createElement('tr');
                row.innerHTML += `
              <td>${nombre} ${apellido}</td>
              <td>${correo}</td>
              <td><button class="btn delete eliminar" id="delete" data-id="${idUsuario}" data-usuario="${idProyecto}" style="background-color: #09254F; color:white;"> Eliminar </button></td>`;

              listado.appendChild(row);

            });
        }

        function addView(){
            window.location.href = `./agregarDesarrolladores.html?idProyecto=${idProyect}`;
        }

        const alertaEliminado = () => {
            alerta.textContent = "Usuario Eliminado Correctamente"
            alerta.style.display = 'block';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 3000);
        }

        function confirmacionEliminacion(e){    
            e.preventDefault();
            const idU = e.target.dataset.id;
            const idP = e.target.dataset.usuario;

            const user = {
                    idUsuario: idU,
                    idProyecto: idP,
            }

            const confirmar = confirm("¿Desea eliminar el usuario?")
            if(confirmar){
                
                 usuariosProyectoService.deleteUsuariosProyecto(user);
                 window.location.href = `./desarrolladores.html?idProyecto=${idProyect}`;
                 alertaEliminado();
            }
         }

         const onLoaded = () => {
            const parametrosURL = new URLSearchParams(window.location.search);
            idProyect = parametrosURL.get('idProyecto');
            mostrarUsuarios();
        }
        document.addEventListener("DOMContentLoaded", onLoaded);
})();