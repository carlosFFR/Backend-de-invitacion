import express  from 'express';
import pg from 'pg';
import cors from 'cors'
import { config } from 'dotenv';

config()

const app = express();
const pool = new pg.Pool({
 connectionString: process.env.DATABASE_URL,
})

const port = 3000;
app.use(cors())
app.use(express.json());

app.get('/invitados',async(req,res)=>{

  const result = await pool.query('SELECT * FROM invitados')
  return res.json(result.rows[0])
})

// Endpoint para insertar datos en la tabla invitados
app.post('/api/invitados', async (req, res) => {
  const { nombre, email, confirmacion, mensaje } = req.body;

  // Validación básica
  if (!nombre || !email || !confirmacion || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Query para insertar los datos
    const query = `
      INSERT INTO invitados (nombre, email, confirmacion, mensaje)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [nombre, email, confirmacion, mensaje];
    const result = await pool.query(query, values);

    // Respuesta exitosa
    res.status(201).json({
      message: 'Invitado registrado exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al insertar datos:', error);

    // Manejo de errores, como violaciones de unicidad
    if (error.code === '23505') {
      res.status(400).json({
        error: 'El email, confirmación o mensaje ya existe en la base de datos',
      });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
