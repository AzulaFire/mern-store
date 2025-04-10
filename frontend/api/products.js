import { connectDb } from './connectDb.js';
import Product from '../models/product.model.js';

export default async function handler(req, res) {
  await connectDb(); // Ensure that MongoDB is connected

  const { id } = req.query; // Extract `id` from query params

  switch (req.method) {
    case 'GET':
      if (id) {
        // Fetch a single product by ID
        try {
          const product = await Product.findById(id);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          return res.status(200).json(product);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } else {
        // Fetch all products
        try {
          const products = await Product.find({});
          return res.status(200).json(products);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }

    case 'POST':
      try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'PUT':
      try {
        if (!id)
          return res.status(400).json({ message: 'Product ID is required' });

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
        });

        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'DELETE':
      try {
        if (!id)
          return res.status(400).json({ message: 'Product ID is required' });

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
