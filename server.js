import express from 'express';
import apiRouter from './routes/api.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.static('dist'));

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
