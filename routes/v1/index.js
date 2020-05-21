import express from 'express';
import urbaniceRouter from './urbanice.route';

const router = express.Router();

/**
 * config version api
 */
router.use('/v1', urbaniceRouter);

export default router;