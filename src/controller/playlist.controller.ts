import { Request, Response } from 'express';
import playlistDao from '../dao/playlist.dao';

const playlistController = {
    addPlaylist: addPlaylist,
    findPlaylists: findPlaylists,
    findPlaylistById: findPlaylistById,
    updatePlaylist: updatePlaylist,
    deleteById: deleteById,
    addVideoToPlaylist: addVideoToPlaylist,
    addVideosToPlaylist: addVideosToPlaylist,
    removeVideoFromPlaylist: removeVideoFromPlaylist,
    removeVideosFromPlaylist: removeVideosFromPlaylist
}

function addPlaylist(req: Request, res: Response) {
    const playlist = req.body;
    playlistDao.create(playlist).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findPlaylistById(req: Request, res: Response) {
    playlistDao.findById(parseInt(req.params.id)).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req: Request, res: Response) {
    playlistDao.deleteById(parseInt(req.params.id)).
        then((data) => {
            res.status(200).json({
                message: "Playlist deleted successfully",
                playlist: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updatePlaylist(req: Request, res: Response) {
    playlistDao.updatePlaylist(req.body, parseInt(req.params.id)).
        then((data) => {
            res.status(200).json({
                message: "Playlist updated successfully",
                playlist: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findPlaylists(req: Request, res: Response) {
    playlistDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function addVideoToPlaylist(req: Request, res: Response) {
    playlistDao.findById(parseInt(req.params.id)).then((playlist) => {
        if (playlist) {
            playlist.addVideo(parseInt(req.params.videoId));
            res.status(200).json({
                message: "Video added to playlist successfully",
                playlist: playlist
            })
        } else {
            res.status(404).json({
                message: "Playlist not found"
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

function removeVideoFromPlaylist(req: Request, res: Response) {
    playlistDao.findById(parseInt(req.params.id)).then((playlist) => {
        if (playlist) {
            playlist.removeVideo(parseInt(req.params.videoId));
            res.status(200).json({
                message: "Video removed from playlist successfully",
                playlist: playlist
            })
        } else {
            res.status(404).json({
                message: "Playlist not found"
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

function addVideosToPlaylist(req: Request, res: Response) {
    playlistDao.findById(parseInt(req.params.id)).then((playlist) => {
        if (playlist) {
            playlist.addVideos(req.body.videos);
            res.status(200).json({
                message: "Videos added to playlist successfully",
                playlist: playlist
            })
        } else {
            res.status(404).json({
                message: "Playlist not found"
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

function removeVideosFromPlaylist(req: Request, res: Response) {
    playlistDao.findById(parseInt(req.params.id)).then((playlist) => {
        if (playlist) {
            playlist.removeVideos(req.body.videos);
            res.status(200).json({
                message: "Videos removed from playlist successfully",
                playlist: playlist
            })
        } else {
            res.status(404).json({
                message: "Playlist not found"
            })
        }
    }).catch((error) => {
        console.log(error);
    });
}

export default playlistController;