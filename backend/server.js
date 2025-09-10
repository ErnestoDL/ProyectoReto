import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const user = rows[0];
    if (user.contrasena !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user.id, correo: user.correo }, 'tu_secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.get('/api/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'tu_secreto');
    const [rows] = await pool.query(
      'SELECT id, nombre, apellido_p, puesto FROM usuarios WHERE id = ?', 
      [decoded.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

app.listen(4000, () => console.log('Servidor corriendo en puerto 4000'));