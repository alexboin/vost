import { Sequelize } from 'sequelize';
import Playlist from '~/models/Playlist';
import Video from '~/models/Video';
import { User, UserModel } from '../models/User';

const userDao = {
    findAll: findAll,
    create: create,
    findByUsername: findByUsername,
    deleteByUsername: deleteByUsername,
    updateUser: updateUser,
    findUserVideos: findUserVideos,
    findUserPlaylists: findUserPlaylists
}

function findAll() {
    return User.findAll({
        attributes: { 
            include: [[Sequelize.fn("COUNT", Sequelize.col("videos.id")), "videoCount"]]
        },
        include: [{
            model: Video, attributes: []
        }]
    });
}

function findByUsername(username: string) {
    return User.findByPk(username, {
        include: [Video, Playlist]
    });
}

function deleteByUsername(username: string) {
    return User.destroy({ where: { username: username } });
}

function create(user: UserModel) {
    const newUser = User.build(user);
    return newUser.save();
}

function updateUser(user: UserModel, username: string) {
    const updateUser = {
        firstname: user.firstname,
        lastname: user.lastname,
    };
    return User.update(updateUser, { where: { username: username } });
}

function findUserVideos(username: string) {
    return Video.findAll({
        where: {
            owner: username,
        }
    });
}

function findUserPlaylists(username: string) {
    return Playlist.findAll({
        where: {
            owner: username,
        }
    });
}

export default userDao;