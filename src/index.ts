import express, { Request, Response } from 'express';
import pgPromise from 'pg-promise';

const app = express();
const port = process.env.PORT || 3000;

// Initialize pg-promise
const pgp = pgPromise();
const db = pgp('jdbc:postgresql://localhost:5432/postgres');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Test DB connection
app.get('/long-position', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT NOW() AS now');
    res.json(data);
  } catch (err: Error | any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
