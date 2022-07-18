import Video from '~/models/Video';
import { Playlist, PlaylistModel } from '../models/Playlist';

const playlistDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updatePlaylist: updatePlaylist
}

function findAll() {
    return Playlist.findAll({
        include: Video
    });
}

function findById(id: number) {
    return Playlist.findByPk(id, {
        include: Video
    });
}

function deleteById(id: number) {
    return Playlist.destroy({ where: { id: id } });
}

function create(playlist: PlaylistModel) {
    const newPlaylist = Playlist.build(playlist);
    return newPlaylist.save();
}

function updatePlaylist(playlist: PlaylistModel, id: number) {
    const updatePlaylist = {
        name: playlist.name,
        description: playlist.description,
        private: playlist.private,
    };
    return Playlist.update(updatePlaylist, { where: { id: id } });
}

export default playlistDao;