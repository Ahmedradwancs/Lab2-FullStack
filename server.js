import express from 'express';
import apiRouter from './routes/api.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//Configure the Express server to point to the dist folder as the public static file folder.
app.use(express.static('dist'));

// Routes
app.use('/api', apiRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
