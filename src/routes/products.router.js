
import { Router } from "express";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router()

// crear producto (admin)
router.post('/', authMiddleware('admin'), (req, res) => {
  // Lógica para crear producto
  res.status(201).json({ message: 'Producto creado' });
});

// actualizar producto (admin)
router.put('/:id', authMiddleware('admin'), (req, res) => {
  // Lógica para actualizar producto
  res.json({ message: 'Producto actualizado' });
});

// eliminar producto (admin)
router.delete('/:id', authMiddleware('admin'), (req, res) => {
  // Lógica para eliminar producto
  res.json({ message: 'Producto eliminado' });
});

export default router