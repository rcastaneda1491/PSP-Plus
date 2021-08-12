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
Insert into EquipoDesarrollo (nombre, descripcion) Values ('Desarrollo Móvil', 'Desarrollo Móvil');
Insert into EquipoDesarrollo (nombre, descripcion) Values ('Desarrollo Web', 'Desarrollo Web');
Insert into EquipoDesarrollo (nombre, descripcion) Values ('Desarrollo Escritorio', 'Desarrollo Escritorio');
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
INSERT INTO Usuario (nombres, apellidos, email, clave, fechaNacimiento, idEquipoDesarrollo, rol)
	values('dev', 'dev', 'dev@dev.com', '12345', '2001/10/14', 1, 'desarrollador');
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
	fechaHoraRecordatorio	datetime,

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
GO
----- Erick Echeverria/Debora Chacach 06/08/2021
create trigger TR_HoraInicioReal
on TiemposPSP after insert
as begin
--Declarar variables
	declare @id_proyecto int, @fechaMinima date, @fechaMaxima date, @horasTrabajadas decimal(8,2), @idTiempoPSP int, @fechaHoraInicioTrabajado datetime, @fechaHoraFinalTrabajado datetime

	select @id_proyecto = idProyecto from inserted;
	select @fechaHoraInicioTrabajado = fechaHoraInicio from inserted;
	select @fechaHoraFinalTrabajado = fechaHoraFinal from inserted;
	select @fechaMinima = CONVERT(date,(select MIN(fechaHoraInicio) from TiemposPSP WHERE idProyecto = @id_proyecto));
	select @fechaMaxima = CONVERT(date,(select MAX(fechaHoraFinal) from TiemposPSP WHERE idProyecto = @id_proyecto));
	select @horasTrabajadas = ROUND((DATEDIFF(SECOND,@fechaHoraInicioTrabajado,@fechaHoraFinalTrabajado)/3600.00), 2,0);

	update Proyectos set fechaInicioReal=(@fechaMinima), fechaFinalReal=(@fechaMaxima), totalHorasTrabajadas=(totalHorasTrabajadas + @horasTrabajadas)
		where idProyecto=@id_proyecto
end
go

create trigger TR_HoraInicioRealEliminar
on TiemposPSP after delete
as begin
--Declarar variables
	declare @id_proyecto int, @fechaMinima date, @fechaMaxima date, @horasTrabajadas decimal(8,2), @idTiempoPSP int, @fechaHoraInicioTrabajado datetime, @fechaHoraFinalTrabajado datetime

	select @id_proyecto = idProyecto from deleted;
	select @fechaHoraInicioTrabajado = fechaHoraInicio from deleted;
	select @fechaHoraFinalTrabajado = fechaHoraFinal from deleted;
	select @fechaMinima = CONVERT(date,(select MIN(fechaHoraInicio) from TiemposPSP WHERE idProyecto = @id_proyecto));
	select @fechaMaxima = CONVERT(date,(select MAX(fechaHoraFinal) from TiemposPSP WHERE idProyecto = @id_proyecto));
	select @horasTrabajadas = ROUND((DATEDIFF(SECOND,@fechaHoraInicioTrabajado,@fechaHoraFinalTrabajado)/3600.00), 2,0);

	update Proyectos set fechaInicioReal=(@fechaMinima), fechaFinalReal=(@fechaMaxima), totalHorasTrabajadas=(totalHorasTrabajadas - @horasTrabajadas)
		where idProyecto=@id_proyecto
end
go
create trigger TR_HoraInicioRealUpdate
on TiemposPSP for update
as begin
--Declarar variables
	declare @id_proyectoEntrante int, @id_proyectoAnterior int, @fechaHoraInicioTrabajadoEntrante datetime, @fechaHoraFinalTrabajadoEntrante datetime, @fechaHoraInicioTrabajadoSaliente datetime, @fechaHoraFinalTrabajadoSaliente datetime,
		@fechaMinima date, @fechaMaxima date, @horas_borrar decimal(8,2), @horas_Ingresar decimal(8,2), @fechaMinimaSaliente date, @fechaMaximaSaliente date;
	
	select @id_proyectoEntrante = idProyecto from inserted;
	select @id_proyectoAnterior = idProyecto from deleted;


	select @fechaHoraInicioTrabajadoEntrante = fechaHoraInicio from inserted;
	select @fechaHoraFinalTrabajadoEntrante = fechaHoraFinal from inserted;

	select @fechaHoraInicioTrabajadoSaliente = fechaHoraInicio from deleted;
	select @fechaHoraFinalTrabajadoSaliente = fechaHoraFinal from deleted;

	select @fechaMinima = CONVERT(date,(select MIN(fechaHoraInicio) from TiemposPSP WHERE idProyecto = @id_proyectoEntrante));
	select @fechaMaxima = CONVERT(date,(select MAX(fechaHoraFinal) from TiemposPSP WHERE idProyecto = @id_proyectoEntrante));

	select @fechaMinimaSaliente = CONVERT(date,(select MIN(fechaHoraInicio) from TiemposPSP WHERE idProyecto = @id_proyectoAnterior));
	select @fechaMaximaSaliente = CONVERT(date,(select MAX(fechaHoraFinal) from TiemposPSP WHERE idProyecto = @id_proyectoAnterior));


	select @horas_Ingresar = ROUND((DATEDIFF(SECOND,@fechaHoraInicioTrabajadoEntrante,@fechaHoraFinalTrabajadoEntrante)/3600.00), 2,0);
	select @horas_borrar = ROUND((DATEDIFF(SECOND,@fechaHoraInicioTrabajadoSaliente,@fechaHoraFinalTrabajadoSaliente)/3600.00), 2,0);

	update Proyectos set fechaInicioReal=(@fechaMinima), fechaFinalReal=(@fechaMaxima), totalHorasTrabajadas=(totalHorasTrabajadas + @horas_Ingresar)
		where idProyecto=@id_proyectoEntrante;

	update Proyectos set fechaInicioReal=(@fechaMinimaSaliente), fechaFinalReal=(@fechaMaximaSaliente), totalHorasTrabajadas=(totalHorasTrabajadas - @horas_borrar)
		where idProyecto=@id_proyectoAnterior;
end

select * from Usuario;
select * from Proyectos;
select * from ErroresPSP;
select * from EquipoDesarrollo
select * from Recordatorios;
