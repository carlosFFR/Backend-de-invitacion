import express  from 'express';

const app = express();
const port = 3000;

// Ruta para manejar la solicitud POST
app.post('/invitados', (req, res) => {
  const { nombre, email, confirmacion, mensaje = '' } = req.body;

  // Validar los datos requeridos
  if (!nombre || !email || !confirmacion) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  // Crear la consulta SQL
  const sql = 'INSERT INTO invitados (nombre, email, confirmacion, mensaje) VALUES (?, ?, ?, ?)';
  const values = [nombre, email, confirmacion, mensaje];

  // Ejecutar la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos:', err);
      return res.status(500).json({ error: 'Error al guardar la confirmación.' });
    }

    res.status(200).json({ message: 'Confirmación enviada correctamente.' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
