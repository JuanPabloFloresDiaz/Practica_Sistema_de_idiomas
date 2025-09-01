-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS sistema_idiomas;
USE sistema_idiomas;

-- Tabla para los roles de usuario
CREATE TABLE roles (
    id CHAR(36) PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Tabla para los usuarios
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY,    
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(14) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    rol_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Tabla para la información específica de los instructores
CREATE TABLE instructores (
    id CHAR(36) PRIMARY KEY,
    usuario_id CHAR(36) NOT NULL UNIQUE,
    biografia TEXT,
    foto_perfil VARCHAR(255) DEFAULT "default.avif",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla para los idiomas disponibles
CREATE TABLE idiomas (
    id CHAR(36) PRIMARY KEY,
    nombre_idioma VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Tabla intermedia para los idiomas que enseña cada instructor (muchos a muchos)
CREATE TABLE idiomas_instructores (
    id CHAR(36) PRIMARY KEY,
    idioma_id CHAR(36) NOT NULL,
    instructor_id CHAR(36) NOT NULL,
    nivel VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (idioma_id) REFERENCES idiomas(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructores(id) ON DELETE CASCADE,
    UNIQUE (idioma_id, instructor_id)
);

-- Tabla para los cursos ofrecidos
CREATE TABLE cursos (
    id CHAR(36) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    nivel VARCHAR(50),
    idioma_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (idioma_id) REFERENCES idiomas(id) ON DELETE SET NULL
);

-- Tabla para las clases individuales
CREATE TABLE clases (
    id CHAR(36) PRIMARY KEY,
    curso_id CHAR(36) NOT NULL,
    instructor_id CHAR(36) NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    capacidad_maxima INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructores(id) ON DELETE CASCADE
);

-- Tabla para las reservas de los estudiantes
CREATE TABLE reservas (
    id CHAR(36) PRIMARY KEY,
    clase_id CHAR(36) NOT NULL,
    estudiante_id CHAR(36) NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_reserva VARCHAR(50) DEFAULT 'Confirmada',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (clase_id) REFERENCES clases(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_usuario_correo ON usuarios(correo);
CREATE INDEX idx_clases_fecha ON clases(fecha);
CREATE INDEX idx_reservas_estudiante ON reservas(estudiante_id);