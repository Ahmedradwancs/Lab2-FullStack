import express from 'express';
import {connectDB, getAllData } from '../controllers/db.js'; // Import the getAllData function

const apiRouter = express.Router();

connectDB(); // Call connectDB function

apiRouter.get('/', async (req, res) => {
    try {
        const data = await getAllData(); // Call getAllData function
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default apiRouter;
