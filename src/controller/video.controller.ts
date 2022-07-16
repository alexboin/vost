import { Request, Response } from 'express';
import videoDao from '../dao/video.dao';

const videoController = {
    addVideo: addVideo,
    findVideos: findVideos,
    findVideoById: findVideoById,
    updateVideo: updateVideo,
    deleteById: deleteById
}

function addVideo(req: Request, res: Response) {
    const video = req.body;
    videoDao.create(video).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findVideoById(req: Request, res: Response) {
    videoDao.findById(parseInt(req.params.id)).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req: Request, res: Response) {
    videoDao.deleteById(parseInt(req.params.id)).
        then((data) => {
            res.status(200).json({
                message: "Video deleted successfully",
                video: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateVideo(req: Request, res: Response) {
    videoDao.updateVideo(req.body, parseInt(req.params.id)).
        then((data) => {
            res.status(200).json({
                message: "Video updated successfully",
                video: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findVideos(req: Request, res: Response) {
    videoDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default videoController;