SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mgp_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `IDArea` int(11) NOT NULL,
  `Descripcion_Area` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `ID` int(11) NOT NULL,
  `IDEmpleado` int(11) NOT NULL,
  `Evento` varchar(255) NOT NULL,
  `Dato_Anterior` varchar(255) NOT NULL,
  `Dato_Nuevo` varchar(255) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boletin`
--

CREATE TABLE `boletin` (
  `IDBoletin` int(11) NOT NULL,
  `IDEmpleado` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Archivo` blob NOT NULL,
  `Fecha_Creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `IDContrato` int(11) NOT NULL,
  `Descripcion_Contrato` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `IDEmpleado` int(11) NOT NULL,
  `Foto_Perfil` blob NOT NULL,
  `DPI` int(11) NOT NULL,
  `NIT` varchar(45) DEFAULT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Correo_Personal` varchar(45) NOT NULL,
  `Estado_Civil` varchar(45) NOT NULL,
  `Nacionalidad` varchar(45) NOT NULL,
  `Sexo` varchar(45) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `IDArea` int(11) NOT NULL,
  `IDPuesto` int(11) NOT NULL,
  `IDContrato` int(11) NOT NULL,
  `Sueldo` float DEFAULT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Retiro` date DEFAULT NULL,
  `IDEstado` int(11) NOT NULL,
  `Correo_Empresarial` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Vacaciones_Devengadas` float NOT NULL,
  `Vacaciones_Gozadas` float NOT NULL,
  `Vacaciones_Pendientes` float NOT NULL,
  `IDRol` int(11) NOT NULL,
  `EstadoEmpleado_IDEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoempleado`
--

CREATE TABLE `estadoempleado` (
  `IDEstado` int(11) NOT NULL,
  `Descripcion_Estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoticket`
--

CREATE TABLE `estadoticket` (
  `IDEstadoTicket` int(11) NOT NULL,
  `Descripcion_Ticket` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso_vacaciones`
--

CREATE TABLE `permiso_vacaciones` (
  `IDPermiso` int(11) NOT NULL,
  `IDEmpleado` int(11) NOT NULL,
  `Fecha_InicioV` date NOT NULL,
  `Fecha_FinV` date NOT NULL,
  `Horario` varchar(256) NOT NULL,
  `Dias` int(11) NOT NULL,
  `Motivo` varchar(512) NOT NULL,
  `Condicion` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

CREATE TABLE `puesto` (
  `IDPuesto` int(11) NOT NULL,
  `Descripcion_Puesto` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IDRol` int(11) NOT NULL,
  `Descripcion_Rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `IDTarea` int(11) NOT NULL,
  `ID_Empleado` int(11) NOT NULL,
  `Nombre_Empresa` varchar(50) NOT NULL,
  `Descripción` varchar(512) NOT NULL,
  `Fecha_Inicio` date NOT NULL,
  `Fecha_Fin` date NOT NULL,
  `Hora_Inicio` time NOT NULL,
  `Hora_Fin` time NOT NULL,
  `Estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `IDTicket` int(11) NOT NULL,
  `IDEmpleao` int(11) NOT NULL,
  `Descripcion` varchar(512) NOT NULL,
  `Justificacion` varchar(512) NOT NULL,
  `Fecha_Creacion` date NOT NULL,
  `IDEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`IDArea`);

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_BITACORA_EMPLEADO` (`IDEmpleado`);

--
-- Indices de la tabla `boletin`
--
ALTER TABLE `boletin`
  ADD PRIMARY KEY (`IDBoletin`),
  ADD KEY `FK_BOLETIN_EMPLEADO` (`IDEmpleado`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`IDContrato`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`IDEmpleado`),
  ADD KEY `FK_EMPLEADO_ROL` (`IDRol`),
  ADD KEY `FK_EMPLEADO_PUESTO` (`IDPuesto`),
  ADD KEY `FK_EMPLEADO_AREA` (`IDArea`),
  ADD KEY `FK_EMPLEADO_CONTRATO` (`IDContrato`),
  ADD KEY `FK_EMPLEADO_ESTADOEMPLEADO` (`IDEstado`);

--
-- Indices de la tabla `estadoempleado`
--
ALTER TABLE `estadoempleado`
  ADD PRIMARY KEY (`IDEstado`);

--
-- Indices de la tabla `estadoticket`
--
ALTER TABLE `estadoticket`
  ADD PRIMARY KEY (`IDEstadoTicket`);

--
-- Indices de la tabla `permiso_vacaciones`
--
ALTER TABLE `permiso_vacaciones`
  ADD PRIMARY KEY (`IDPermiso`),
  ADD KEY `FK_PERMISO_VACACIONES_EMPLEADO` (`IDEmpleado`);

--
-- Indices de la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`IDPuesto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IDRol`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`IDTarea`),
  ADD KEY `FK_TAREA_EMPLEADO` (`ID_Empleado`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`IDTicket`),
  ADD KEY `FK_TICKET_EMPLEADO` (`IDEmpleao`),
  ADD KEY `FK_TICKET_ESTADOTICKET` (`IDEstado`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `fk_Bitacora_Empleado1` FOREIGN KEY (`IDEmpleado`) REFERENCES `empleado` (`IDEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `boletin`
--
ALTER TABLE `boletin`
  ADD CONSTRAINT `FK_BOLETIN_EMPLEADO` FOREIGN KEY (`IDEmpleado`) REFERENCES `empleado` (`IDEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `FK_EMPLEADO_AREA` FOREIGN KEY (`IDArea`) REFERENCES `area` (`IDArea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_EMPLEADO_CONTRATO` FOREIGN KEY (`IDContrato`) REFERENCES `contrato` (`IDContrato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_EMPLEADO_ESTADOEMPLEADO` FOREIGN KEY (`IDEstado`) REFERENCES `estadoempleado` (`IDEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_EMPLEADO_PUESTO` FOREIGN KEY (`IDPuesto`) REFERENCES `puesto` (`IDPuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_EMPLEADO_ROL` FOREIGN KEY (`IDRol`) REFERENCES `rol` (`IDRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permiso_vacaciones`
--
ALTER TABLE `permiso_vacaciones`
  ADD CONSTRAINT `FK_PERMISO_VACACIONES_EMPLEADO` FOREIGN KEY (`IDEmpleado`) REFERENCES `empleado` (`IDEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `FK_TAREA_EMPLEADO` FOREIGN KEY (`ID_Empleado`) REFERENCES `empleado` (`IDEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_TICKET_EMPLEADO` FOREIGN KEY (`IDEmpleao`) REFERENCES `empleado` (`IDEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_TICKET_ESTADOTICKET` FOREIGN KEY (`IDEstado`) REFERENCES `estadoticket` (`IDEstadoTicket`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
