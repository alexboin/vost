import express from 'express';
const router = express.Router();
import videoRoutes from './videos.route';

router.use('/videos', videoRoutes);

export default router;