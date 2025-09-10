# ProyectoReto

Aplicación **full-stack** con **Node.js (Express) + MySQL** y **Vite/React**.  
- **Backend:** `http://localhost:4000`  
- **Frontend:** `http://localhost:5173`

> Autenticación básica (login).

---

## Tabla de contenidos
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Instalación rápida](#instalación-rápida)
- [Configuración de entorno](#configuración-de-entorno)
  - [.env del backend](#env-del-backend)
  - [.env del frontend (opcional)](#env-del-frontend-opcional)
- [Base de datos](#base-de-datos)

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
git clone https://github.com/ErnestoDL/ProyectoReto.git
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
# MySQL
DB_HOST=mysql-1c1c0d4a-dr-1dcf.g.aivencloud.com
DB_USER=avnadmin
DB_PASS=AVNS_zRv7AH56yw2jNwqAbw4
DB_NAME=defaultdb
DB_PORT=13300
```

> **No** subas `.env` al repositorio.

## Base de datos

Si no funciona el servicio descrito arriba, con las credenciales dadas. Conecta la base de datos que tengas a Aiven.
