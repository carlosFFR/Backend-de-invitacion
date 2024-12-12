import express  from 'express';
import pg from 'pg';
import { config } from 'dotenv';

config()


const app = express();
const pool = new pg.Pool({
 connectionString: process.env.DATABASE_URL,
//  ssl:true
})

const port = 3000;

app.get('/invitados',async(req,res)=>{
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0])
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
