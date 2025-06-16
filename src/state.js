

let usuariosGuardados = [];
try {
    const data = localStorage.getItem('usuarios');
    usuariosGuardados = data ? JSON.parse(data) : [];
} catch (e) {
    usuariosGuardados = [];
}

export const state = {
    usuarios: usuariosGuardados,
    usuarioActual: {
    id: null,
    name: "",
    pass: "",
    }
};