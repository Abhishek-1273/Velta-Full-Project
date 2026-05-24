import express from 'express';
import createPlan from '../controllers/plan.controller.js';
 
const router = express.Router();
 
router.post('/', createPlan);
 
export default router;