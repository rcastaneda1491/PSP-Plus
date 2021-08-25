using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

#nullable disable

namespace PSP_.Models
{
    public partial class DBPSPPLUSContext : DbContext
    {
        public DBPSPPLUSContext()
        {
        }

        public DBPSPPLUSContext(DbContextOptions<DBPSPPLUSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EquipoDesarrollo> EquipoDesarrollos { get; set; }
        public virtual DbSet<ErroresPsp> ErroresPsps { get; set; }
        public virtual DbSet<Proyecto> Proyectos { get; set; }
        public virtual DbSet<Recordatorio> Recordatorios { get; set; }
        public virtual DbSet<TiemposPsp> TiemposPsps { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<UsuarioProyecto> UsuarioProyectos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.

                //optionsBuilder.UseSqlServer("Server=DESKTOP-UVJPA4R;DATABASE=DBPSPPLUS;user=prueba;password=prueba");


                //optionsBuilder.UseSqlServer("Server=DESKTOP-DF943KT;DATABASE=DBPSPPLUS;user=tito1;password=1234");

                //optionsBuilder.UseSqlServer("Server=DESKTOP-U4PFR0A;DATABASE=DBPSPPLUS;user=Rogelio;password=12345");

                // optionsBuilder.UseSqlServer("Server=LAPTOP-AA3NT37P;DATABASE=DBPSPPLUS;user=Usuario1;password=Usuario1");
                 //optionsBuilder.UseSqlServer("Server=LAPTOP-AA3NT37P;DATABASE=DBPSPPLUS;user=Usuario1;password=Usuario1");
 

              optionsBuilder.UseSqlServer("Server=DESKTOP-IFKEU1D\\SQLEXPRESS;DATABASE=DBPSPPLUS;user=sa;password=albin123");
 
  

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<EquipoDesarrollo>(entity =>
            {
                entity.HasKey(e => e.IdEquipoDesarrollo)
                    .HasName("PK__EquipoDe__C302843867E62A7F");

                entity.ToTable("EquipoDesarrollo");

                entity.Property(e => e.IdEquipoDesarrollo).HasColumnName("idEquipoDesarrollo");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<ErroresPsp>(entity =>
            {
                entity.HasKey(e => e.IdErrorPsp)
                    .HasName("PK__ErroresP__9CDF13FA855DD4D1");

                entity.ToTable("ErroresPSP");

                entity.Property(e => e.IdErrorPsp).HasColumnName("idErrorPSP");

                entity.Property(e => e.Correlativo).HasColumnName("correlativo");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("eliminado");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.FechaHoraFinal)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaHoraFinal");

                entity.Property(e => e.FechaHoraInicio)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaHoraInicio");

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Introducido)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("introducido");

                entity.Property(e => e.LenguajeDesarrollo)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("lenguajeDesarrollo");

                entity.Property(e => e.Solucion)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("solucion");

                entity.Property(e => e.TiempoCorrecion)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("tiempoCorrecion");

                entity.Property(e => e.TipoError)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tipoError");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.ErroresPsps)
                    .HasForeignKey(d => d.IdProyecto)
                    .HasConstraintName("FK_ErroresPSP_PROYECTO");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ErroresPsps)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ErroresPSP_USUARIO");
            });

            modelBuilder.Entity<Proyecto>(entity =>
            {
                entity.HasKey(e => e.IdProyecto)
                    .HasName("PK__Proyecto__D0AF4CB48DBDDBA3");

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.Property(e => e.Cliente)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("cliente");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Dev)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("dev");

                entity.Property(e => e.FechaFinalEsperada)
                    .HasColumnType("date")
                    .HasColumnName("fechaFinalEsperada");

                entity.Property(e => e.FechaFinalReal)
                    .HasColumnType("date")
                    .HasColumnName("fechaFinalReal");

                entity.Property(e => e.FechaInicioEsperada)
                    .HasColumnType("date")
                    .HasColumnName("fechaInicioEsperada");

                entity.Property(e => e.FechaInicioReal)
                    .HasColumnType("date")
                    .HasColumnName("fechaInicioReal");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.TotalHorasTrabajadas)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("totalHorasTrabajadas")
                    .HasDefaultValueSql("((0.0))");
            });

            modelBuilder.Entity<Recordatorio>(entity =>
            {
                entity.HasKey(e => e.IdRecordatorios)
                    .HasName("PK__Recordat__3EC6A1214E52FCF7");

                entity.Property(e => e.IdRecordatorios).HasColumnName("idRecordatorios");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Estado)
                    .IsUnicode(false)
                    .HasColumnName("estado")
                    .HasDefaultValueSql("('No Leído')");

                entity.Property(e => e.FechaHoraRecordatorio)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaHoraRecordatorio");

                entity.Property(e => e.HorasAlerta)
                    .HasColumnType("decimal(8, 2)")
                    .HasColumnName("horasAlerta");

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.TipoRecordatorio).HasColumnName("tipoRecordatorio");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.Recordatorios)
                    .HasForeignKey(d => d.IdProyecto)
                    .HasConstraintName("FK_Recordatorios_PROYECTO");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Recordatorios)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recordatorios_USUARIO");
            });

            modelBuilder.Entity<TiemposPsp>(entity =>
            {
                entity.HasKey(e => e.IdTiempoPsp)
                    .HasName("PK__TiemposP__08E1CCE5EF03A66C");

                entity.ToTable("TiemposPSP");

                entity.Property(e => e.IdTiempoPsp).HasColumnName("idTiempoPSP");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.FechaHoraFinal)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaHoraFinal");

                entity.Property(e => e.FechaHoraInicio)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaHoraInicio");

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.TiemposPsps)
                    .HasForeignKey(d => d.IdProyecto)
                    .HasConstraintName("FK_TiemposPSP_PROYECTO");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.TiemposPsps)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TiemposPSP_USUARIO");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuario__645723A6BB20897B");

                entity.ToTable("Usuario");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Apellidos)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("apellidos");

                entity.Property(e => e.Clave)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("clave");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnType("date")
                    .HasColumnName("fechaNacimiento");

                entity.Property(e => e.IdEquipoDesarrollo).HasColumnName("idEquipoDesarrollo");

                entity.Property(e => e.Nombres)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nombres");

                entity.Property(e => e.Rol)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("rol");

                entity.HasOne(d => d.IdEquipoDesarrolloNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdEquipoDesarrollo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USUARIO_EQUIPODESARROLLO");
            });

            modelBuilder.Entity<UsuarioProyecto>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdProyecto })
                    .HasName("PK__UsuarioP__395DD76D1345A62D");

                entity.ToTable("UsuarioProyecto");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdProyecto).HasColumnName("idProyecto");

                entity.HasOne(d => d.IdProyectoNavigation)
                    .WithMany(p => p.UsuarioProyectos)
                    .HasForeignKey(d => d.IdProyecto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USUARIOPROYECTO_PROYECTO");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.UsuarioProyectos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USUARIOPROYECTO_USUARIO");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
