import Sequelize, { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '../config/database';

export interface Playlist_VideosModel extends Model<InferAttributes<Playlist_VideosModel>, InferCreationAttributes<Playlist_VideosModel>> {
    playlist_id: number;
    video_id: number;
}

const Playlist_Videos = db.define('playlist_videos', {
    playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, { timestamps: false });

export default Playlist_Videos;