import { Request, Response } from 'express';
import userDao from '../dao/user.dao';

const userController = {
    addUser: addUser,
    findUsers: findUsers,
    findByUsername: findByUsername,
    updateUser: updateUser,
    deleteByUsername: deleteByUsername,
    listUserVideos: findUserVideos,
    listUserPlaylists: findUserPlaylists
}

function addUser(req: Request, res: Response) {
    const user = req.body;
    userDao.create(user).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findByUsername(req: Request, res: Response) {
    userDao.findByUsername(req.params.username).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteByUsername(req: Request, res: Response) {
    userDao.deleteByUsername(req.params.username).
        then((data) => {
            res.status(200).json({
                message: "User deleted successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUser(req: Request, res: Response) {
    userDao.updateUser(req.body, req.params.username).
        then((data) => {
            res.status(200).json({
                message: "User updated successfully",
                user: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUsers(req: Request, res: Response) {
    userDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserVideos(req: Request, res: Response) {
    userDao.findUserVideos(req.params.username).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUserPlaylists(req: Request, res: Response) {
    userDao.findUserPlaylists(req.params.username).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default userController;