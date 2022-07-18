import express from 'express';
const router = express.Router();
import userController from '../controller/user.controller';

router.post('/', userController.addUser);
router.get('/', userController.findUsers);
router.get('/:username', userController.findByUsername);
router.put('/:username', userController.updateUser);
router.delete('/:username', userController.deleteByUsername);

router.get('/:username/videos', userController.listUserVideos);
router.get('/:username/playlists', userController.listUserPlaylists);

export default router;