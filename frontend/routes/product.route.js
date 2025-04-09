import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

// GET ALL PRODUCTS
router.get('/', getAllProducts);

// UPDATE A PRODUCT
router.put('/:id', updateProduct);

// CREATE A PRODUCT
router.post('/', createProduct);

// DELETE A PRODUCT
router.delete('/:id', deleteProduct);

export default router;
