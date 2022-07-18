import Sequelize, { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../config/database';
import Playlist from './Playlist';
import Video from './Video';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    username: string;
    firstname: string;
    lastname: string;
}

export const User = db.define<UserModel>('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
});

export default User;