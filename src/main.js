import './style.css';
import { state } from './state.js';


function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

const form = document.getElementById('loginForm');
const tabla = document.getElementById('tablaUsuarios');

let filaActual = null;
let usuarioActual = null;

// Cambia el form a lo que pide el qliao de ale....
function setEditMode(usuarioObj, fila) {
  document.getElementById('formTitle').textContent = 'Editar información';
  document.getElementById('formButton').textContent = 'Guardar cambios';
  form.setAttribute('data-action', 'edit');
  document.getElementById('usuario').value = usuarioObj.name;
  document.getElementById('contrasena').value = usuarioObj.pass;
  filaActual = fila;
  usuarioActual = usuarioObj;
}

// Cambiar el formulario a modo login
function setLoginMode() {
  document.getElementById('formTitle').textContent = 'Crear Usuario';
  document.getElementById('formButton').textContent = 'Crear Nuevo Usuario';
  form.setAttribute('data-action', 'login');
  document.getElementById('usuario').value = '';
  document.getElementById('contrasena').value = '';
  filaActual = null;
  usuarioActual = null;
}

// agregar una fila a la tabla y configuro el botón Editar
function agregarFila(usuarioObj) {
  const fila = tabla.insertRow(-1);
  fila.insertCell(0).textContent = usuarioObj.id;
  fila.insertCell(1).textContent = usuarioObj.name;
  fila.insertCell(2).textContent = usuarioObj.pass;

  const celdaBoton = fila.insertCell(3);
  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.className = 'btn-tabla';
  celdaBoton.appendChild(btnEditar);

  btnEditar.addEventListener('click', function() {
    setEditMode(usuarioObj, fila);
  });
}

// Cargar usuarios guardados al iniciar
state.usuarios.forEach(agregarFila);

// agregar usuario nuevo o editar
form.addEventListener('submit', function(e) {

  e.preventDefault();

  const action = form.getAttribute('data-action');
  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  if (action === 'login') {
    // Agregar usuario nuevo
    const usuarioObj = { 
          id: generarId(),
          name: usuario, 
          pass: contrasena 
        };
        state.usuarios.push(usuarioObj);
        localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
        agregarFila(usuarioObj);
        tabla.style.display = '';
        form.reset();
  } else if (action === 'edit' && usuarioActual && filaActual) {
    // Editar usuario existente..
    usuarioActual.name = usuario;
    usuarioActual.pass = contrasena;
    filaActual.cells[1].textContent = usuario;
    filaActual.cells[2].textContent = contrasena;
    localStorage.setItem('usuarios', JSON.stringify(state.usuarios));
    setLoginMode();
    form.reset();
  }
});

// Inicializa el formulario en modo login
setLoginMode();