import express from 'express';
import { createCategory } from '../controllers/CategoryController';

const router = express.Router();

router.post('/', createCategory);

// Define other routes for Category

export default router;
