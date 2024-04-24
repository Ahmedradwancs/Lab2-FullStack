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
        const newEmployee = await createEmployee(req.body);
        res.json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route handler for creating a new project
apiRouter.post('/projects', async (req, res) => {
    try {
        const newProject = await createProject(req.body);
        res.json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route handler for creating a new project assignment
apiRouter.post('/project_assignments', async (req, res) => {
    try {
        const newProjectAssignment = await createProjectAssignment(req.body);
        res.status(201).json(newProjectAssignment);
    } catch (error) {
        console.error('Error creating project assignment:', error);
        res.status(500).json({ error: 'Employee ID or Project code do not exists' });
    }
});




export default apiRouter;
