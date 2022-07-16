import express from 'express';
const router = express.Router();
import videoController from '../controller/video.controller';

router.post('/', videoController.addVideo);
router.get('/', videoController.findVideos);
router.get('/:id', videoController.findVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteById);

export default router;