import express from 'express';
const router = express.Router();
import playlistController from '../controller/playlist.controller';

router.post('/', playlistController.addPlaylist);
router.get('/', playlistController.findPlaylists);
router.get('/:id', playlistController.findPlaylistById);
router.put('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deleteById);

router.post('/:id/videos/:videoId', playlistController.addVideoToPlaylist);
router.post('/:id/videos', playlistController.addVideosToPlaylist);
router.delete('/:id/videos/:videoId', playlistController.removeVideoFromPlaylist);
router.delete('/:id/videos', playlistController.removeVideosFromPlaylist);

export default router;