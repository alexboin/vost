import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import routes from './routes/routes';

//Database Connection
import db from './config/database';
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

app.use('/', routes);

const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));