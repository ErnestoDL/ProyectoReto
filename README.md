# ProyectoReto

Aplicación **full-stack** con **Node.js (Express) + MySQL** y **Vite/React**.  
- **Backend:** `http://localhost:4000`  
- **Frontend:** `http://localhost:5173`

> Autenticación básica (login) y endpoint protegido (`/api/me`).

---

## Tabla de contenidos
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Instalación rápida](#instalación-rápida)
- [Configuración de entorno](#configuración-de-entorno)
  - [.env del backend](#env-del-backend)
  - [.env del frontend (opcional)](#env-del-frontend-opcional)
- [Base de datos](#base-de-datos)
- [Ejecutar en desarrollo](#ejecutar-en-desarrollo)
- [Build / Producción](#build--producción)
- [API Reference](#api-reference)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts](#scripts)
- [Resolución de problemas](#resolución-de-problemas)
- [Seguridad](#seguridad)
- [Licencia](#licencia)

---

## Stack
- **Frontend:** Vite + React (JS/TS opcional)
- **Backend:** Node.js + Express
- **DB:** MySQL 8+
- **Auth:** JWT (Bearer token)
- **CORS:** habilitado para desarrollo

---

## Requisitos
- **Node.js 18+** (incluye `npm`)
- **MySQL 8+**
- **Git**

---

## Instalación rápida

```bash
# 1) Clonar
git clone https://github.com/TU_USUARIO/ProyectoReto.git
cd ProyectoReto
```

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd ../frontend
npm install
```

---

## Configuración de entorno

### .env del backend
Crea un archivo **`backend/.env`**:

```ini
# Servidor
PORT=4000

# JWT
JWT_SECRET=cambia_esto_en_produccion

# MySQL
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=proyecto_reto
DB_PORT=3306
```

> **No** subas `.env` al repositorio.

### .env del frontend (opcional)
Si el backend no corre en `http://localhost:4000`, crea **`frontend/.env`**:

```ini
VITE_API_BASE_URL=http://localhost:4000
```

Ajusta las llamadas `fetch/axios` para usar `import.meta.env.VITE_API_BASE_URL`.

---

## Base de datos

Conéctate a MySQL y ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS proyecto_reto
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE proyecto_reto;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  apellido_p  VARCHAR(100) NOT NULL,
  puesto      VARCHAR(100) NOT NULL,
  correo      VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL
);

-- Usuario de prueba (si el backend NO hashea):
INSERT INTO usuarios (nombre, apellido_p, puesto, correo, password)
VALUES ('Admin','Demo','Administrador','admin@example.com','password');
```

> Si el backend usa **bcrypt**, inserta un **hash** en `password`.  
> Genera uno con Node:
> ```bash
> node -e "console.log(require('bcryptjs').hashSync('password',10))"
> ```
> y pega el hash en lugar de `password`.

---

## Ejecutar en desarrollo

### Backend
```bash
cd backend
# hot-reload (si hay nodemon en package.json)
npm run dev
# o
npm start
```
Deberías ver algo como: `Servidor corriendo en puerto 4000`.

### Frontend
En otra terminal:
```bash
cd frontend
npm run dev
```
Abre `http://localhost:5173`.

---

## Build / Producción

### Frontend
```bash
cd frontend
npm run build
npm run preview   # sirve el build localmente
```

> Para servir el build detrás del backend o un servidor estático (Nginx), entrega el contenido de `frontend/dist`.

### Backend
Configura variables de entorno y usa un process manager (ej. PM2):
```bash
cd backend
npm ci
NODE_ENV=production PORT=4000 node server.js
# o con PM2
pm2 start server.js --name proyectoreto -i max
```

---

## API Reference

Base URL en desarrollo: `http://localhost:4000`

### Auth

**POST** `/api/login`  
Body (JSON):
```json
{
  "correo": "admin@example.com",
  "password": "password"
}
```
Respuestas:
- `200 OK` → `{ "token": "..." }`
- `401 Unauthorized` → credenciales inválidas

**GET** `/api/me`  
Header:
```
Authorization: Bearer <token>
```
Respuestas:
- `200 OK` → `{ "id": 1, "nombre": "...", "correo": "..." }`
- `401 Unauthorized` → token inválido/ausente

### Ejemplos con cURL
```bash
# Login
curl -s -X POST http://localhost:4000/api/login   -H "Content-Type: application/json"   -d '{"correo":"admin@example.com","password":"password"}'

# Me
curl -s http://localhost:4000/api/me   -H "Authorization: Bearer TOKEN_AQUI"
```

---

## Estructura del proyecto

```
ProyectoReto/
├─ backend/
│  ├─ src/                 # controladores, rutas, servicios
│  ├─ .env                 # variables (no versionar)
│  ├─ package.json
│  └─ server.js            # punto de entrada
└─ frontend/
   ├─ src/                 # páginas, componentes, hooks
   ├─ index.html
   ├─ package.json
   └─ vite.config.js
```

---

## Scripts

### Backend
- `npm run dev` — desarrollo (nodemon)
- `npm start` — ejecución normal

### Frontend
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run preview` — sirve el build

---

## Resolución de problemas

- **PowerShell (Windows):** error `npm.ps1 cannot be loaded`
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
- **Conexión MySQL:** verifica host, puerto y credenciales del `.env`.
- **CORS:** asegúrate de tener `cors()` en el backend para permitir `http://localhost:5173`.
- **Puertos ocupados:** cambia `PORT` en el backend o usa `--port` en Vite.
- **Variables de entorno:** nunca subas `.env`; confirma que el frontend usa `VITE_API_BASE_URL` si aplica.
- **Tokens:** el frontend debe enviar `Authorization: Bearer <token>` a endpoints protegidos.

---

## Seguridad
- Mantén **`JWT_SECRET`** fuera del código (solo en variables de entorno).
- No subas **`.env`** ni secretos al repositorio.
- Usa HTTPS y tokens con expiración en producción.
- Considera **rate limiting** y **helmet** en Express.

---

## Licencia
Este proyecto se distribuye bajo la licencia **MIT**. Puedes agregar un archivo `LICENSE` con el texto correspondiente.
