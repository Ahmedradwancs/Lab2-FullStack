import express from 'express';
import apiRouter from './api/routers/api.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Hello from Express');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
