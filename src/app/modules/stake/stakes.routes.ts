
import express from 'express';
import { StakesController } from './stakes.controller';

const router = express.Router();
router.post('/startStaking', StakesController.startStaking);

export const stakesRoutes = router;
