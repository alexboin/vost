import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../config/database';
import User from './User';

export interface VideoModel extends Model<InferAttributes<VideoModel>, InferCreationAttributes<VideoModel>> {
    id: CreationOptional<number>;
    title: string;
    description: string;
    private: boolean;
    url: string;
    owner: string;
}

export const Video = db.define<VideoModel>('video', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    private: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

User.hasMany(Video, {
    foreignKey: 'owner', 
});

export default Video;