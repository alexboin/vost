import { Video, VideoModel } from '../models/Video';

const videoDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateVideo: updateVideo
}

function findAll() {
    return Video.findAll();
}

function findById(id: number) {
    return Video.findByPk(id);
}

function deleteById(id: number) {
    return Video.destroy({ where: { id: id } });
}

function create(video: VideoModel) {
    const newVideo = Video.build(video);
    return newVideo.save();
}

function updateVideo(video: VideoModel, id: number) {
    const updateVideo = {
        name: video.name,
        description: video.description,
        private: video.private,
        url: video.url
    };
    return Video.update(updateVideo, { where: { id: id } });
}

export default videoDao;