(function(){

        const listado = document.getElementById('lista-usuarios');
        let idProyect;
        
        listado.addEventListener('click', confirmacionEliminacion);

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

        function confirmacionEliminacion(e){

            const idU = e.target.dataset.id;
            const idP = e.target.dataset.usuario;

            const user = {
                    idUsuario: idU,
                    idProyecto: idP,
            }

            usuariosProyectoService.deleteUsuariosProyecto(user);
         }

         const onLoaded = () => {
            const parametrosURL = new URLSearchParams(window.location.search);
            idProyect = parametrosURL.get('idProyecto');
            mostrarUsuarios();
        }
        document.addEventListener("DOMContentLoaded", onLoaded);
})();