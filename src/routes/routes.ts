import express from 'express';
const router = express.Router();
import videoRoutes from './videos.route';
import playlistRoutes from './playlists.route';
import usersRoutes from './users.route';

router.use('/videos', videoRoutes);
router.use('/playlists', playlistRoutes)
router.use('/users', usersRoutes);

export default router;