import express from 'express';
import {connectDB, getAllData, createEmployee, createProject, createProjectAssignment } from '../controllers/db.js';

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

apiRouter.get('/employees', async (req, res) => {
    try {
        const data = await getAllData(); // Call getAllData function
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

apiRouter.post('/employees', async (req, res) => {
    try {
        const data = await Employee.createEmployee(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

apiRouter.post('/projects', async (req, res) => {
    try {
        const data = await Project.createProject(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

apiRouter.post('/project_assignments', async (req, res) => {
    try {
        const data = await ProjectAssignment.createProjectAssignment(req.body);
        res.json(data);
    } catch (error) {
        console.error('Error creating project assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);



export default apiRouter;
