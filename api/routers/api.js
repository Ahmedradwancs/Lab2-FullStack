import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.json({ message: 'Hello from the API' });
}   );

export default apiRouter;