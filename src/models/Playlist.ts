import Sequelize, { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../config/database';
import Playlist_Videos from './Playlist_Videos';
import User from './User';
import Video from './Video';

export interface PlaylistModel extends Model<InferAttributes<PlaylistModel>, InferCreationAttributes<PlaylistModel>> {
    id: CreationOptional<number>;
    name: string;
    description: string;
    private: boolean;
    owner: string;
    addVideo: (videoId: number) => Promise<void>;
    addVideos: (videoIds: number[]) => Promise<void>;
    removeVideo: (videoId: number) => Promise<void>;
    removeVideos: (videoIds: number[]) => Promise<void>;
}

export const Playlist = db.define<PlaylistModel>('playlist', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
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
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

User.hasMany(Playlist, {
    foreignKey: 'owner',
});

Video.belongsToMany(Playlist, {
    through: 'playlist_videos'
});

Playlist.belongsToMany(Video, {
    through: 'playlist_videos'
});

Playlist.prototype.addVideo = async function(videoId: number) {
    await Playlist_Videos.create({
        playlistId: this.id,
        videoId: videoId,
    });
}

Playlist.prototype.addVideos = async function(videoIds: number[]) {
    await Playlist_Videos.bulkCreate(videoIds.map(videoId => ({
        playlistId: this.id,
        videoId: videoId,
    })));
}

Playlist.prototype.removeVideo = async function(videoId: number) {
    await Playlist_Videos.destroy({
        where: {
            playlistId: this.id,
            videoId: videoId,
        }
    });
}

Playlist.prototype.removeVideos = async function(videoIds: number[]) {
    await Playlist_Videos.destroy({
        where: {
            playlistId: this.id,
            videoId: {
                [Sequelize.Op.in]: videoIds,
            }
        }
    });
}

export default Playlist;