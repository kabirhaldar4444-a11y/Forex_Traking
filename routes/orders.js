import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderByTrackingId,
  getOrderById,
  updateOrder,
  deleteOrder,
  getStats
} from '../controllers/orderController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getAllOrders);
router.get('/stats', protect, getStats);
router.get('/tracking/:trackingId', getOrderByTrackingId);
router.get('/:id', protect, getOrderById);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

export default router;
