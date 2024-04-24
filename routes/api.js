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

// Route handler for creating a new employee
apiRouter.post('/employees', async (req, res) => {
    try {
        const newEmployee = await createEmployee(req.body);
        res.status(201).json(newEmployee); 
    } catch (error) {
        if (error.message === 'Email is already in use') {
            res.status(400).json({ error: 'Email is already in use' }); 
        } else {
            res.status(500).json({ error: error.message }); 
        }
    }
});
// Route handler for creating a new project
apiRouter.post('/projects', async (req, res) => {
    try {
        const newProject = await createProject(req.body);
        res.status(201).json(newProject); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});


// Route handler for creating a new project assignment
apiRouter.post('/project_assignments', async (req, res) => {
    try {
        const newProjectAssignment = await createProjectAssignment(req.body);
        res.status(201).json(newProjectAssignment);
    } catch (error) {
        // Handle specific errors and send appropriate responses
        if (error.message === 'Employee ID does not exist') {
            res.status(400).json({ error: 'Employee ID does not exist' });
        } else if (error.message === 'Project code does not exist') {
            res.status(400).json({ error: 'Project code does not exist' });
        } else {
            res.status(500).json({ error: 'Failed to add the project assignment' });
        }
    }
});




export default apiRouter;
