document.addEventListener('DOMContentLoaded', function () {

    ////////////////////////LOGIN////////////////////////
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('Correo').value;
            const password = document.getElementById('Password').value;

            // Petición POST para enviar los datos del login
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Inicio de sesión exitoso", "success");
                        setTimeout(() => {
                            window.location.href = "Principal.html";
                        }, 2000);
                    } else {
                        mostrarMensaje("Usuario No Valido", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }


    ////////////////////////EMPLEADOS////////////////////////
    //---------------AGREGAR NUEVO EMPLEADO-------------------
    const addEmployeeForm = document.getElementById('addEmployee');
    if (addEmployeeForm) {
        addEmployeeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nuevoEmpleado = {
                DPI: document.getElementById('DPI').value,
                NIT: document.getElementById('NIT').value,
                Nombre: document.getElementById('Nombre').value,
                Apellido: document.getElementById('Apellido').value,
                Direccion: document.getElementById('Direccion').value,
                Correo_Personal: document.getElementById('Correo_Personal').value,
                Estado_Civil: document.getElementById('Estado_Civil').value,
                Nacionalidad: document.getElementById('Nacionalidad').value,
                Sexo: document.getElementById('Sexo').value,
                Telefono: document.getElementById('Telefono').value,
                Fecha_Nacimiento: document.getElementById('Fecha_Nacimiento').value,
                IDArea: document.getElementById('IDArea').value,
                IDPuesto: document.getElementById('IDPuesto').value,
                IDContrato: document.getElementById('IDContrato').value,
                Sueldo: document.getElementById('Sueldo').value,
                Fecha_Inicio: document.getElementById('Fecha_Inicio').value,
                IDEstado: document.getElementById('IDEstado').value,
                Correo_Empresarial: document.getElementById('Correo_Empresarial').value,
                Password: document.getElementById('Password').value,
            };

            fetch('http://localhost:3000/empleado/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoEmpleado),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Empleado agregado exitosamente", "success");
                        addEmployeeForm.reset();
                    } else {
                        mostrarMensaje("Error al agregar empleado", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    //---------------CONSULTA DE EMPLEADO-------------------
    const tablaEmpleados = document.getElementById('tableEmployee');
    if (tablaEmpleados) {
        const tbody = tablaEmpleados.getElementsByTagName('tbody')[0];

        fetch('http://localhost:3000/empleados')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo
                data.forEach(empleado => {
                    const fila = tbody.insertRow();

                    fila.insertCell(0).innerText = empleado.DPI;
                    fila.insertCell(1).innerText = empleado.NIT;
                    fila.insertCell(2).innerText = empleado.Nombre;
                    fila.insertCell(3).innerText = empleado.Apellido;
                    fila.insertCell(4).innerText = empleado.Correo_Empresarial;
                    fila.insertCell(5).innerText = empleado.Area;

                    // Celda para botones de editar y eliminar
                    const accionesCelda = fila.insertCell(6);
                    const btnEditar = document.createElement('button');
                    btnEditar.innerText = 'Editar';
                    btnEditar.className = 'btn-editar';

                    const btnEliminar = document.createElement('button');
                    btnEliminar.innerText = 'Eliminar';
                    btnEliminar.className = 'btn-eliminar';

                    accionesCelda.appendChild(btnEditar);
                    accionesCelda.appendChild(btnEliminar);

                    // Evento click para eliminar
                    btnEliminar.addEventListener('click', function () {
                        if (confirm(`¿Estás seguro de que deseas eliminar al empleado con DPI ${empleado.DPI}?`)) {
                            eliminarEmpleado(empleado.DPI);
                        }
                    });

                    // **Evento click para editar**
                    btnEditar.addEventListener('click', function () {
                        editarEmpleado(empleado.DPI);
                    });
                });

            })
            .catch(error => console.error('Error:', error));
    }


    //---------------ELIMINAR EMPLEADO-------------------
    function eliminarEmpleado(dpi) {
        fetch(`http://localhost:3000/empleado/eliminar/${dpi}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mostrarMensaje("Empleado eliminado exitosamente", "success");
                    // Recargar la tabla o eliminar la fila correspondiente
                    location.reload(); // Esta línea recarga la página para refrescar la tabla
                } else {
                    mostrarMensaje("Error al eliminar empleado", "error");
                }
            })
            .catch(error => console.error('Error:', error));
    }

    //---------------EDITAR EMPLEADO-------------------
    function editarEmpleado(dpi) {
        window.location.href = `EmpleadoEditar.html?dpi=${dpi}`;
    }

    const editarEmpleadoForm = document.getElementById('editEmployee');
    if (editarEmpleadoForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const dpi = urlParams.get('dpi');

        fetch(`http://localhost:3000/empleado/${dpi}`)
            .then(response => response.json())
            .then(empleado => {
                // Rellenar el formulario con los datos del empleado
                document.getElementById('DPI').value = empleado.DPI;
                document.getElementById('NIT').value = empleado.NIT;
                document.getElementById('Nombre').value = empleado.Nombre;
                document.getElementById('Apellido').value = empleado.Apellido;
                document.getElementById('Direccion').value = empleado.Direccion;
                document.getElementById('Correo_Personal').value = empleado.Correo_Personal;
                document.getElementById('Estado_Civil').value = empleado.Estado_Civil;
                document.getElementById('Nacionalidad').value = empleado.Nacionalidad;
                document.getElementById('Sexo').value = empleado.Sexo;
                document.getElementById('Telefono').value = empleado.Telefono;
                document.getElementById('Fecha_Nacimiento').value = empleado.Fecha_Nacimiento;
                document.getElementById('IDArea').value = empleado.IDArea;
                document.getElementById('IDPuesto').value = empleado.IDPuesto;
                document.getElementById('IDContrato').value = empleado.IDContrato;
                document.getElementById('Sueldo').value = empleado.Sueldo;
                document.getElementById('Fecha_Inicio').value = empleado.Fecha_Inicio;
                document.getElementById('IDEstado').value = empleado.IDEstado;
                document.getElementById('Correo_Empresarial').value = empleado.Correo_Empresarial;
                document.getElementById('Password').value = empleado.Password;
            })
            .catch(error => console.error('Error:', error));

        editarEmpleadoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const empleadoEditado = {
                IDEmpleado: document.getElementById('IDEmpleado').value,
                DPI: document.getElementById('DPI').value,
                NIT: document.getElementById('NIT').value,
                Nombre: document.getElementById('Nombre').value,
                Apellido: document.getElementById('Apellido').value,
                Direccion: document.getElementById('Direccion').value,
                Correo_Personal: document.getElementById('Correo_Personal').value,
                Estado_Civil: document.getElementById('Estado_Civil').value,
                Nacionalidad: document.getElementById('Nacionalidad').value,
                Sexo: document.getElementById('Sexo').value,
                Telefono: document.getElementById('Telefono').value,
                Fecha_Nacimiento: document.getElementById('Fecha_Nacimiento').value,
                IDArea: document.getElementById('IDArea').value,
                IDPuesto: document.getElementById('IDPuesto').value,
                IDContrato: document.getElementById('IDContrato').value,
                Sueldo: document.getElementById('Sueldo').value,
                Fecha_Inicio: document.getElementById('Fecha_Inicio').value,
                IDEstado: document.getElementById('IDEstado').value,
                Correo_Empresarial: document.getElementById('Correo_Empresarial').value,
                Password: document.getElementById('Password').value,
            };

            fetch(`http://localhost:3000/empleado/editar/${dpi}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empleadoEditado),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Empleado editado exitosamente", "success");
                        setTimeout(() => {
                            window.location.href = "EmpleadoReporte.html";
                        }, 2000);
                    } else {
                        mostrarMensaje("Error al editar empleado", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }




    ////////////////////////TICKETS////////////////////////
    //---------------AGREGAR NUEVO TICKET-------------------
    const addTicketForm = document.getElementById('addTicket');
    if (addTicketForm) {
        addTicketForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nuevoTicket = {
                TipoTicket: document.getElementById('TipoTicket').value,
                Descripcion: document.getElementById('Descripcion').value,
            };

            fetch('http://localhost:3000/ticket/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoTicket),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Ticket creado exitosamente", "success");
                        addTicketForm.reset();
                    } else {
                        mostrarMensaje("Error al generar su ticket", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }

    //---------------CONSULTA DE TICKETS-------------------
    const tableTickets = document.getElementById('tableTickets');
    if (tableTickets) {
        const tbody = tableTickets.getElementsByTagName('tbody')[0];

        fetch('http://localhost:3000/tickets')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo
                data.forEach(ticket => {
                    const fila = tbody.insertRow();

                    fila.insertCell(0).innerText = ticket.IDEmpleado;
                    fila.insertCell(1).innerText = ticket.TipoTicket;
                    fila.insertCell(2).innerText = ticket.Descripcion;
                    fila.insertCell(3).innerText = ticket.Fecha_Creacion;
                    fila.insertCell(4).innerText = ticket.IDEstado;
                });

            })
            .catch(error => console.error('Error:', error));
    }

    ////////////////////////AREA////////////////////////
    //---------------AGREGAR NUEVA AREA-------------------
    const addAreaForm = document.getElementById('addArea');
    if (addAreaForm) {
        addAreaForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nuevaArea = {
                Descripcion_Area: document.getElementById('Descripcion_Area').value,
            };

            fetch('http://localhost:3000/area/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaArea),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Area creada exitosamente", "success");
                        addAreaForm.reset();
                    } else {
                        mostrarMensaje("Error al crear el area", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
                location.reload(true);

        });
    }

    //---------------CONSULTA DE AREAS-------------------
    const tableArea = document.getElementById('tableAreas');
    if (tableArea) {
        const tbody = tableArea.getElementsByTagName('tbody')[0];

        fetch('http://localhost:3000/api/areas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo
                data.forEach(ticket => {
                    const fila = tbody.insertRow();

                    fila.insertCell(0).innerText = ticket.IDArea;
                    fila.insertCell(1).innerText = ticket.Descripcion_Area;

                    // Celda para botones de editar y eliminar
                    const accionesCelda = fila.insertCell(2);
                    const btnEliminar = document.createElement('button');
                    btnEliminar.innerText = 'Eliminar';
                    btnEliminar.className = 'btn-eliminar';

                    accionesCelda.appendChild(btnEliminar);

                    // Evento click para eliminar
                    btnEliminar.addEventListener('click', function () {
                        if (confirm(`¿Estás seguro de que deseas eliminar el área: ${ticket.Descripcion_Area}?`)) {
                            eliminarArea(ticket.IDArea);
                        }
                    });
                });

            })
            .catch(error => console.error('Error:', error));
    }

    //---------------ELIMINAR AREA-------------------
    function eliminarArea(id) {
        fetch(`http://localhost:3000/area/eliminar/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mostrarMensaje("Empleado eliminado exitosamente", "success");
                    // Recargar la tabla o eliminar la fila correspondiente
                    location.reload(); // Esta línea recarga la página para refrescar la tabla
                } else {
                    mostrarMensaje("Error al eliminar empleado", "error");
                }
            })
            .catch(error => console.error('Error:', error));
    }

    ////////////////////////CONTRATO////////////////////////
    //---------------AGREGAR NUEVO CONTRATO-------------------
    const addContratoForm = document.getElementById('addContrato');
    if (addContratoForm) {
        addContratoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nuevoContrato = {
                Descripcion_Area: document.getElementById('Descripcion_Contrato').value,
            };

            fetch('http://localhost:3000/contrato/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoContrato),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        mostrarMensaje("Contrato creado exitosamente", "success");
                        addContratoForm.reset();
                    } else {
                        mostrarMensaje("Error al crear el contrato", "error");
                    }
                })
                .catch(error => console.error('Error:', error));
                location.reload(true);

        });
    }

    //---------------CONSULTA DE CONTRATOS-------------------
    const tableContrato = document.getElementById('tableContratos');
    if (tableContrato) {
        const tbody = tableContrato.getElementsByTagName('tbody')[0];

        fetch('http://localhost:3000/api/contrato')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo
                data.forEach(ticket => {
                    const fila = tbody.insertRow();

                    fila.insertCell(0).innerText = ticket.IDContrato;
                    fila.insertCell(1).innerText = ticket.Descripcion_Contrato;

                    // Celda para botones de editar y eliminar
                    const accionesCelda = fila.insertCell(2);
                    const btnEliminar = document.createElement('button');
                    btnEliminar.innerText = 'Eliminar';
                    btnEliminar.className = 'btn-eliminar';

                    accionesCelda.appendChild(btnEliminar);

                    // Evento click para eliminar
                    btnEliminar.addEventListener('click', function () {
                        if (confirm(`¿Estás seguro de que deseas eliminar el contrato: ${ticket.Descripcion_Contrato}?`)) {
                            eliminarArea(ticket.IDContrato);
                        }
                    });
                });

            })
            .catch(error => console.error('Error:', error));
    }

    //---------------ELIMINAR CONTRATO-------------------
    function eliminarContrato(id) {
        fetch(`http://localhost:3000/contrato/eliminar/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mostrarMensaje("Contrato eliminado exitosamente", "success");
                    // Recargar la tabla o eliminar la fila correspondiente
                    location.reload(); // Esta línea recarga la página para refrescar la tabla
                } else {
                    mostrarMensaje("Error al eliminar contrato", "error");
                }
            })
            .catch(error => console.error('Error:', error));
    }


    ////////////////////////EXTRA////////////////////////
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

});


//------CONSULTA SELECT-------
cargarAreas();
cargarContrato();
cargarPuesto();
cargarEstado();
cargarRol();

// Cargar áreas
function cargarAreas() {
    fetch('http://localhost:3000/api/areas')
        .then(response => response.json())
        .then(data => {
            const areaSelect = document.getElementById("IDArea");
            areaSelect.innerHTML = `<option value="" disabled selected>Área del Empleado</option>`;
            data.forEach(area => {
                const option = document.createElement("option");
                option.value = area.IDArea;
                option.textContent = area.Descripcion_Area;
                areaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando las áreas:', error));
}

// Cargar contratos
function cargarContrato() {
    fetch('http://localhost:3000/api/contrato')
        .then(response => response.json())
        .then(data => {
            const contratoSelect = document.getElementById("IDContrato");
            contratoSelect.innerHTML = `<option value="" disabled selected>Tipo de Contrato</option>`;
            data.forEach(contrato => {
                const option = document.createElement("option");
                option.value = contrato.IDContrato;
                option.textContent = contrato.Descripcion_Contrato;
                contratoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando los contratos:', error));
}

//Cargar Puesto
function cargarPuesto() {
    fetch('http://localhost:3000/api/puesto')
        .then(response => response.json())
        .then(data => {
            const puestoSelect = document.getElementById("IDPuesto");
            puestoSelect.innerHTML = `<option value="" disabled selected>Tipo de Puesto</option>`;
            data.forEach(puesto => { 
                const option = document.createElement("option");
                option.value = puesto.IDPuesto;
                option.textContent = puesto.Descripcion_Puesto;
                puestoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando los puestos:', error));
}

//Cargar estado
function cargarEstado() {
    fetch('http://localhost:3000/api/estado')
        .then(response => response.json())
        .then(data => {
            const estadoSelect = document.getElementById("IDEstado");
            estadoSelect.innerHTML = `<option value="" disabled selected>Estado Empleado</option>`;
            data.forEach(estado => { 
                const option = document.createElement("option");
                option.value = estado.IDEstado;
                option.textContent = estado.Descripcion_Estado;
                estadoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando los puestos:', error));
}

//Cargar rol
function cargarRol() {
    fetch('http://localhost:3000/api/rol')
        .then(response => response.json())
        .then(data => {
            const rolSelect = document.getElementById("IDRol");
            rolSelect.innerHTML = `<option value="" disabled selected>Rol del Empleado</option>`;
            data.forEach(rol => { 
                const option = document.createElement("option");
                option.value = rol.IDRol;
                option.textContent = rol.Descripcion_Rol;
                rolSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando los puestos:', error));
}




//---------------DEJAR DE ULTIMO SIEMPRE ESTA FUNCION---------
//---------------CONSULTA DE EMPLEADO PDF-------------------
const tablaPDF = document.getElementById('tablaPDF');
const tbody = tablaPDF ? tablaPDF.getElementsByTagName('tbody')[0] : null;

function cargarDatos(searchText = '') {
    // Mostrar un mensaje de carga si es necesario
    // ...

    fetch(`http://localhost:3000/empleados/PDF?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Verifica qué datos se están recibiendo

            // Limpiar la tabla existente
            if (tbody) tbody.innerHTML = '';

            // Insertar nuevas filas
            data.forEach(empleado => {
                const fila = tbody.insertRow();

                fila.insertCell(0).innerText = empleado.IDEmpleado;
                fila.insertCell(1).innerText = empleado.Foto_Perfil;
                fila.insertCell(2).innerText = empleado.Nombre;
                fila.insertCell(3).innerText = empleado.Apellido;
                fila.insertCell(4).innerText = empleado.Descripcion_Area;
                fila.insertCell(5).innerText = empleado.Puesto;
                fila.insertCell(6).innerText = empleado.Contrato;
                fila.insertCell(7).innerText = empleado.Fecha_Inicio;
                fila.insertCell(8).innerText = empleado.Fecha_Retiro;
                fila.insertCell(9).innerText = empleado.Estado;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Carga inicial de datos
if (tablaPDF) {
    cargarDatos();
}

// Búsqueda dinámica
document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    cargarDatos(searchText);
});