import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = import.meta.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
});
