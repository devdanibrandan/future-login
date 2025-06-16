import './style.css'

const form = document.getElementById('loginForm');
const tabla = document.getElementById('tablaUsuarios');

const editUsuario = document.getElementById('edit-user');
const editPass = document.getElementById('edit-pass');

const guardarEdit = document.querySelector('.guardarDatos');
const btnCerrar = document.querySelector('.cerrarForm');


// para mi futuro... podria almacenar los datos del usuario seleccionado en una fila... let filaActual = null;

  form.addEventListener('submit', function(e) {
    
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value; // No mostrar
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-tabla';

    const fila = tabla.insertRow(-1);
    fila.insertCell(0).textContent = usuario;
    fila.insertCell(1).textContent = contrasena;

    //se usa fila que contiene tabla.inserRow que agrega el elemento en la tabla.
    const celdaBoton = fila.insertCell(2);
    //agrego el elemento btn mediante el appenmdChild al final de los elementos padres.
    celdaBoton.appendChild(btnEditar);
    
    tabla.style.display = '';

    form.reset();

    btnEditar.addEventListener('click', function() {

      const nombreUsuario = fila.cells[0].textContent;
      const passUsuario = fila.cells[1].textContent;
      editUsuario.value = nombreUsuario;
      editPass.value = passUsuario;
      editForm.style.display = '';
      
    });

    guardarEdit.addEventListener('click', function (){

        fila.cells[1].textContent = editPass.value;

      editForm.style.display = 'none';

    });
    
    btnCerrar.addEventListener('click', function() {
      editForm.style.display = 'none';
    });

  });

