import Video from './src/models/Video';
import User from './src/models/User';
import Playlist from './src/models/Playlist';

import db from './src/config/database';
import Playlist_Videos from '~/models/Playlist_Videos';
db.authenticate().then(async () => {
    console.log('Database connected...');

    // Sync Database
    await db.sync();

    // Delete all database entries
    await Video.destroy({ truncate: true, cascade: true });
    await User.destroy({ truncate: true, cascade: true });
    await Playlist.destroy({ truncate: true, cascade: true });
    await Playlist_Videos.destroy({ truncate: true, cascade: true });

    // Create test users
    const bob = await User.create({
        username: 'bob',
        firstname: 'Bob',
        lastname: 'Doe',
    });

    const alice = await User.create({
        username: 'alice',
        firstname: 'Alice',
        lastname: 'Doe',
    });

    // Create test videos
    const video1 = await Video.create({
        title: 'Test Video 1',
        description: 'This is a test video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        private: false,
        owner: bob.username,
    });

    const video2 = await Video.create({
        title: 'Test Video 2',
        description: 'This is a test video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ2',
        private: false,
        owner: bob.username,
    });

    const video3 = await Video.create({
        title: 'Test Video 3',
        description: 'This is a test video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ3',
        private: false,
        owner: bob.username,
    });

    const video4 = await Video.create({
        title: 'Test Video 4',
        description: 'This is a test video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ4',
        private: false,
        owner: alice.username,
    });

    const video5 = await Video.create({
        title: 'Test Video 5',
        description: 'This is a test video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ5',
        private: false,
        owner: alice.username,
    });

    // Create test playlists
    const playlist1 = await Playlist.create({
        name: 'Test Playlist 1',
        description: 'This is a test playlist',
        private: false,
        owner: bob.username,
    });

    const playlist2 = await Playlist.create({
        name: 'Test Playlist 2',
        description: 'This is a test playlist',
        private: false,
        owner: alice.username,
    });

    await playlist1.addVideos([video1.id, video2.id, video3.id]);
    await playlist2.addVideos([video4.id, video5.id]);

    console.log('Database populated...');
}).catch(err => {
    console.log('Error: ' + err);
})
