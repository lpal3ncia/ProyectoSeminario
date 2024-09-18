import { db } from './Configuracion.js';
import { collection, query, where, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

async function restablecerContrasena(correo) {
    try {
        const empleadosRef = collection(db, "Empleados");
        const q = query(empleadosRef, where("Correo", "==", correo));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            mostrarMensaje("Correo no encontrado", "error");
        } else {
            const nuevaContrasena = generarContrasena();
            let usuarioDoc;
            querySnapshot.forEach((doc) => {
                usuarioDoc = doc.id; // Obtener el ID del documento para actualizarlo
            });

            if (usuarioDoc) {
                const docRef = doc(db, "Empleados", usuarioDoc);
                await updateDoc(docRef, {
                    Password: nuevaContrasena
                });

                mostrarContraseña(nuevaContrasena);
                
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 8000);
            }
        }
    } catch (error) {
        console.log("Error al restablecer contraseña: ", error);
        mostrarMensaje("Error al restablecer contraseña", "error");
    }
}

function generarContrasena() {
    const longitud = 6;
    let contrasena = '';
    
    for (let i = 0; i < longitud; i++) {
        const digito = Math.floor(Math.random() * 10);
        contrasena += digito;
    }
    
    return contrasena;
}

// Exporta la función restablecerContrasena
export { restablecerContrasena };

// Función para mostrar mensajes en una ventana emergente
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

// Añade esta función para mostrar la contraseña en una ventana emergente
function mostrarContraseña(nuevaContrasena) {
    mostrarMensaje(`Tu nueva contraseña es: ${nuevaContrasena}`, 'success');
}

