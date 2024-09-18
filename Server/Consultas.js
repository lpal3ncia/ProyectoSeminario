const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Permite todos los orígenes para depuración
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Permite métodos GET, POST y DELETE
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const fechaActual = new Date();
const anio = fechaActual.getFullYear();
const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
const dia = ('0' + fechaActual.getDate()).slice(-2);
const horas = ('0' + fechaActual.getHours()).slice(-2);
const minutos = ('0' + fechaActual.getMinutes()).slice(-2);
const segundos = ('0' + fechaActual.getSeconds()).slice(-2);
const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

////////////////////////LOGIN////////////////////////
//INICIO DE SESION
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM empleado WHERE Correo_Empresarial = ?';

    pool.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const user = results[0];

        if (password === user.Password) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid password' });
        }
    });
});

//REINICIO CONTRASEÑA
app.post('/reset-password', (req, res) => {
    const email = req.body.email;

    // Generar nueva contraseña aleatoria
    const newPassword = crypto.randomBytes(6).toString('hex'); // Ejemplo: 12 caracteres
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Actualizar la base de datos con la nueva contraseña
    const query = 'UPDATE Empleado SET Password = ? WHERE email = ?';
    db.query(query, [hashedPassword, email], (err, result) => {
        if (err) throw err;

        if (result.affectedRows === 0) {
            return res.send('No se encontró el usuario con ese correo electrónico.');
        }

        // Mostrar la nueva contraseña generada al usuario
        res.send(`<p>Tu nueva contraseña es: <strong>${newPassword}</strong></p>`);
    });
});
///////////////////////////////////////////////////////

////////////////////////EMPLEADOS////////////////////////
//AGREGAR EMPLEADO
app.post('/empleado/nuevo', (req, res) => {
    const nuevoEmpleado = req.body;

    const camposRequeridos = [
        'DPI', 'NIT', 'Nombre', 'Apellido', 'Direccion', 'Correo_Personal',
        'Estado_Civil', 'Nacionalidad', 'Sexo', 'Telefono', 'Fecha_Nacimiento',
        'IDArea', 'IDPuesto', 'IDContrato', 'Sueldo', 'Fecha_Inicio', 'IDEstado', 'Correo_Empresarial', 'Password'
    ];

    for (const campo of camposRequeridos) {
        if (!nuevoEmpleado[campo]) {
            return res.status(400).json({ success: false, message: `Campo faltante: ${campo}` });
        }
    }

    const sql = `INSERT INTO empleado 
                 (DPI, NIT, Nombre, Apellido, Direccion, Correo_Personal, Estado_Civil, Nacionalidad, Sexo, Telefono, Fecha_Nacimiento, IDArea, IDPuesto, IDContrato, Sueldo, Fecha_Inicio, IDEstado, Correo_Empresarial, Password)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valores = [
        nuevoEmpleado.DPI,
        nuevoEmpleado.NIT,
        nuevoEmpleado.Nombre,
        nuevoEmpleado.Apellido,
        nuevoEmpleado.Direccion,
        nuevoEmpleado.Correo_Personal,
        nuevoEmpleado.Estado_Civil,
        nuevoEmpleado.Nacionalidad,
        nuevoEmpleado.Sexo,
        nuevoEmpleado.Telefono,
        nuevoEmpleado.Fecha_Nacimiento,
        nuevoEmpleado.IDArea,
        nuevoEmpleado.IDPuesto,
        nuevoEmpleado.IDContrato,
        nuevoEmpleado.Sueldo,
        nuevoEmpleado.Fecha_Inicio,
        nuevoEmpleado.IDEstado,
        nuevoEmpleado.Correo_Empresarial,
        nuevoEmpleado.Password
    ];

    pool.query(sql, valores, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            console.error('Query:', sql);
            console.error('Values:', valores);
            return res.status(500).json({ success: false, message: 'Error al agregar empleado' });
        }
        res.json({ success: true });
    });
});

//CONSULTAR EMPLEADO
app.get('/empleados', (req, res) => {
    const sql = 'SELECT E.Foto_Perfil, E.DPI, E.NIT, E.Nombre, E.Apellido, E.Direccion, E.Correo_Personal, E.Estado_Civil, E.Nacionalidad, E.Sexo, E.Telefono, E.Fecha_Nacimiento, A.Descripcion_Area "Area", P.Descripcion_Puesto "Puesto", C.Descripcion_Contrato "Contrato", E.Sueldo, E.Fecha_Inicio, E.Fecha_Retiro, EP.Descripcion_Estado "Estado", E.Correo_Empresarial, R.Descripcion_Rol "ROL" FROM empleado E JOIN area A ON E.IDArea=A.IDArea JOIN puesto P ON E.IDPuesto=P.IDPuesto JOIN contrato C ON E.IDContrato=C.IDContrato JOIN estadoempleado EP ON E.IDEstado=EP.IDEstado Join rol R ON E.IDRol=R.IDRol';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});

//ELIMINAR EMPLEADO
app.delete('/empleado/eliminar/:dpi', (req, res) => {
    const dpi = req.params.dpi;
    pool.query('DELETE FROM empleado WHERE DPI = ?', [dpi], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        return res.json({ success: true });
    });
});

//CONSULTA EMPLEADO POR DPIs
app.get('/empleado/:dpi', (req, res) => {
    const dpi = req.params.dpi;
    const sql = 'SELECT * FROM empleado WHERE DPI = ?';

    pool.query(sql, [dpi], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Empleado no encontrado' });
        }
        res.json(results[0]);
    });
});

//EDITAR EMPLEADO
app.put('/empleado/editar/:dpi', (req, res) => {
    const dpi = req.params.dpi;
    const actualizaciones = req.body;

    const camposActualizables = Object.keys(actualizaciones)
        .filter(key => actualizaciones[key] !== undefined);

    if (camposActualizables.length === 0) {
        return res.status(400).json({ success: false, message: 'No hay campos para actualizar' });
    }

    const sql = `UPDATE empleado SET ${camposActualizables.map(campo => `${campo} = ?`).join(', ')} WHERE DPI = ?`;

    const valores = [...camposActualizables.map(campo => actualizaciones[campo]), dpi];

    pool.query(sql, valores, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error al actualizar empleado' });
        }
        res.json({ success: true });
    });
});

// CONSULTAR EMPLEADO PDF
app.get('/empleados/PDF', (req, res) => {
    const search = req.query.search || '';
    const sql = `
        SELECT E.IDEmpleado, E.Foto_Perfil, E.Nombre, E.Apellido, A.Descripcion_Area, P.Descripcion_Puesto "Puesto",
               C.Descripcion_Contrato "Contrato", DATE_FORMAT(E.Fecha_Inicio, "%d/%m/%Y") "Fecha_Inicio",
               DATE_FORMAT(E.Fecha_Retiro, "%d/%m/%Y") "Fecha_Retiro", EP.Descripcion_Estado "Estado"
        FROM empleado E
        JOIN area A ON E.IDArea=A.IDArea
        JOIN puesto P ON E.IDPuesto=P.IDPuesto
        JOIN contrato C ON E.IDContrato=C.IDContrato
        JOIN estadoempleado EP ON E.IDEstado=EP.IDEstado
        WHERE E.IDEmpleado LIKE ? OR E.Foto_Perfil LIKE ? OR E.Nombre LIKE ? OR E.Apellido LIKE ?
          OR A.Descripcion_Area LIKE ? OR P.Descripcion_Puesto LIKE ? OR C.Descripcion_Contrato LIKE ?
          OR EP.Descripcion_Estado LIKE ?
    `;
    const values = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});
///////////////////////////////////////////////////////

////////////////////////TICKETS////////////////////////
//AGREGAR TICKET
app.post('/ticket/nuevo', (req, res) => {
    const nuevoTicket = req.body;
    const camposRequeridos = [
        'TipoTicket', 'Descripcion'
    ];

    for (const campo of camposRequeridos) {
        if (!nuevoTicket[campo]) {
            return res.status(400).json({ success: false, message: `Campo faltante: ${campo}` });
        }
    }

    const sql = `INSERT INTO ticket 
                 (IDEmpleado, TipoTicket, Descripcion, Fecha_Creacion, IDEstado)
                 VALUES (?, ?, ?, ?, ?)`;

    const valores = [
        '1',
        nuevoTicket.TipoTicket,
        nuevoTicket.Descripcion,
        fechaFormateada,
        '1'

    ];

    pool.query(sql, valores, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            console.error('Query:', sql);
            console.error('Values:', valores);
            return res.status(500).json({ success: false, message: 'Error al agregar empleado' });
        }
        res.json({ success: true });
    });
});

//CONSULTAR TICKET
app.get('/tickets', (req, res) => {
    const sql = 'SELECT T.IDTicket, Concat(E.Nombre, " ", E.Apellido) "IDEmpleado", T.TipoTicket, T.Descripcion, DATE_FORMAT(T.Fecha_Creacion, "%d/%m/%Y") "Fecha_Creacion", ET.Descripcion_Ticket "IDEstado" FROM ticket T JOIN estadoticket ET ON T.IDEstado=ET.IDEstadoTicket JOIN empleado E ON E.IDEmpleado=T.IDEmpleado';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});
///////////////////////////////////////////////////////

//TRAER NOMBRE Y ID AREA
app.get('/api/areas', (req, res) => {
    const sql = 'SELECT IDArea, Descripcion_Area FROM area';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});

//TRAER NOMBRE Y ID CONTRATO
app.get('/api/contrato', (req, res) => {
    const sql = 'SELECT IDContrato, Descripcion_Contrato FROM contrato';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});

//TRAER NOMBRE Y ID PUESTO
app.get('/api/puesto', (req, res) => {
    const sql = 'SELECT IDPuesto, Descripcion_Puesto FROM puesto';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});

//TRAER NOMBRE Y ID ESTADO EMPLEADO
app.get('/api/estado', (req, res) => {
    const sql = 'SELECT IDEstado, Descripcion_Estado FROM estadoempleado';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});

//TRAER NOMBRE Y ID ROL EMPLEADO
app.get('/api/rol', (req, res) => {
    const sql = 'SELECT IDRol, Descripcion_Rol FROM rol';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Error en la base de datos' });
        }
        console.log('Resultados:', results);
        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
