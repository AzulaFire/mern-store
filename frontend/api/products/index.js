import connectDb from '../../utils/db.js';
import Product from '../../models/product.model';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  await connectDb(); // Ensure that MongoDB is connected before proceeding with the query

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
