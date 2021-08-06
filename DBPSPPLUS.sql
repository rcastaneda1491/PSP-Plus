--USE CRUD;
--DROP DATABASE DBPSPPLUS;

CREATE DATABASE DBPSPPLUS;
GO
USE DBPSPPLUS;
GO
CREATE TABLE Proyectos(
	idProyecto			int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	nombre				varchar(100) NOT NULL,
	descripcion			varchar(MAX) NOT NULL,
	cliente				varchar(200) NOT NULL, -- Solamente Nombre del cliente
	fechaInicioEsperada	date NOT NULL,
	fechaInicioReal		date, -- Se completara con Trigger
	fechaFinalEsperada	date NOT NULL,
	fechaFinalReal		date, -- Se completara con Trigger
	dev					varchar(50) NOT NULL,
	totalHorasTrabajadas decimal(8,2) DEFAULT(0.0), -- Manejarlo en Horas | Se completara con Trigger
);
GO
CREATE TABLE EquipoDesarrollo(
	idEquipoDesarrollo	int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	nombre				varchar(100) NOT NULL,
	descripcion			varchar(100) NOT NULL,
);
GO
Insert into EquipoDesarrollo (nombre, descripcion) Values ('Equipo 1', 'Desarrollo móvil');
GO
CREATE TABLE Usuario(
	idUsuario			int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	nombres				varchar(100) NOT NULL,
	apellidos			varchar(100) NOT NULL,
	email				varchar(100) NOT NULL,
	clave				varchar(100) NOT NULL,
	fechaNacimiento		date NOT NULL,
	rol					varchar(50) NOT NULL,
	idEquipoDesarrollo	int NOT NULL,
	CONSTRAINT FK_USUARIO_EQUIPODESARROLLO FOREIGN KEY(idEquipoDesarrollo) 
		REFERENCES EquipoDesarrollo(idEquipoDesarrollo)
);
GO
INSERT INTO Usuario (nombres, apellidos, email, clave, fechaNacimiento, idEquipoDesarrollo, rol)
	values('admin', 'admin', 'admin@admin.com', '12345', '2001/09/14', 1, 'administrador');
GO
CREATE TABLE UsuarioProyecto( -- Varios desarrolladores podrán tener varios proyectos
	idUsuario		int NOT NULL,
	idProyecto		int NOT NULL,
	PRIMARY KEY(idUsuario,idProyecto),
	CONSTRAINT FK_USUARIOPROYECTO_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuario(idUsuario),
	CONSTRAINT FK_USUARIOPROYECTO_PROYECTO FOREIGN KEY(idProyecto) 
		REFERENCES Proyectos(idProyecto),
);
GO
CREATE TABLE TiemposPSP(
	idTiempoPSP			int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	fechaHoraInicio		datetime NOT NULL,
	fechaHoraFinal		datetime NOT NULL,
	descripcion			varchar(MAX) NOT NULL,
	idProyecto			int,
	idUsuario			int NOT NULL,
	CONSTRAINT FK_TiemposPSP_PROYECTO FOREIGN KEY(idProyecto) 
		REFERENCES Proyectos(idProyecto),
	CONSTRAINT FK_TiemposPSP_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuario(idUsuario)
);
GO
CREATE TABLE ErroresPSP(
	idErrorPSP			int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	fecha				date NOT NULL,
	descripcion			varchar(MAX) NOT NULL,
	solucion			varchar(MAX) NOT NULL,
	correlativo			int NOT NULL,
	tipoError			varchar(100) NOT NULL,
	introducido			varchar(100) NOT NULL,
	eliminado			varchar(100) NOT NULL, -- Fases
	fechaHoraInicio		datetime NOT NULL,
	fechaHoraFinal		datetime NOT NULL,
	tiempoCorrecion		decimal(8,2) NOT NULL, -- Sera la resta entre fechaHoraFinal - fechaHoraInicio
	lenguajeDesarrollo	varchar(100) NOT NULL,
	idProyecto			int,
	idUsuario			int NOT NULL,
	CONSTRAINT FK_ErroresPSP_PROYECTO FOREIGN KEY(idProyecto) 
		REFERENCES Proyectos(idProyecto),
	CONSTRAINT FK_ErroresPSP_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuario(idUsuario)
);
GO
CREATE TABLE Recordatorios(
	idRecordatorios		int  IDENTITY(1,1) NOT NULL PRIMARY KEY,
	descripcion			varchar(MAX) NOT NULL,	
	idUsuario			int NOT NULL,
	tipoRecordatorio	int NOT NULL, -- Puede ser:  1,2,3,4
	idProyecto			int, -- Obligatorio para Tipo 2 y 3
	estado				varchar(MAX) DEFAULT('No Leído'), -- Ó Leído

	-- Recordatorio Tipo 1
	fechaHoraRecordatorio	date,

	-- Recordatorio Tipo 2 | Tiempo total de horas ingresadas de un proyecto
	horasAlerta				decimal(8,2),

	-- Recordatorio Tipo 3 | Si no se han ingresado actividades de algún proyecto
	-- Llenara el campo "fechaHoraRecordatorio" y "idProyecto"

	-- Recordatorio Tipo 4 | Si ya se ha excedido un tiempo (fecha) máximo de un proyecto en algún día.
	-- Llenara el campo "idProyecto"
	
	CONSTRAINT FK_Recordatorios_PROYECTO FOREIGN KEY(idProyecto) 
		REFERENCES Proyectos(idProyecto),
	CONSTRAINT FK_Recordatorios_USUARIO FOREIGN KEY(idUsuario) 
		REFERENCES Usuario(idUsuario)
);
