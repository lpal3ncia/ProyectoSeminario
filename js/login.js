// Importar la configuración de Firebase desde el archivo Configuracion.js
import { db } from './Configuracion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

async function verificarUsuario(correo, password) {
    try {
        const empleadosRef = collection(db, "Empleados");
        const q = query(empleadosRef, where("Correo", "==", correo));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            mostrarMensaje("Usuario no encontrado", "error");
        } else {
            let usuarioValido = false;
            querySnapshot.forEach((doc) => {
                if (doc.data().Password === password) {
                    usuarioValido = true;
                }
            });

            if (usuarioValido) {
                // Almacena un estado de autenticación en sessionStorage
                sessionStorage.setItem('usuarioAutenticado', 'true');

                mostrarMensaje("Inicio de sesión exitoso", "success");
                setTimeout(() => {
                    window.location.href = "Principal.html"; 
                }, 2000);
            } else {
                mostrarMensaje("Contraseña incorrecta", "error");
            }
        }
    } catch (error) {
        console.log("Error al verificar usuario: ", error);
        mostrarMensaje("Error al verificar usuario", "error");
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeElement = document.createElement('div');
    mensajeElement.className = `mensaje ${tipo}`;
    mensajeElement.innerHTML = `
        <span class="icon">${tipo === 'error' ? '❌' : '✅'}</span>
        <span>${mensaje}</span>
        <button class="cerrar">&times;</button>
    `;
    document.body.appendChild(mensajeElement);

    const cerrarButton = mensajeElement.querySelector('.cerrar');
    cerrarButton.addEventListener('click', () => {
        document.body.removeChild(mensajeElement);
    });
}

export { verificarUsuario };