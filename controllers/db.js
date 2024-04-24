import ProjectAssignment from "../models/ProjectAssignment.js";
import Employee from "../models/Employee.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.CONNECTION_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        //process.exit(1);
    }
    };


// Function to retrieve all data from the database using aggregation
export const getAllData = async () => {
    try {
        const aggregate = await ProjectAssignment.aggregate([
            {
                $lookup: {
                    from: "Employee",
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $lookup: {
                    from: "Project",
                    localField: "project_code",
                    foreignField: "project_code",
                    as: "project"
                }
            }
            
        ])
        return aggregate;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


// Function to create a new employee with validation
export const createEmployee = async (employeeData) => {
    try {
        // Check if the email is already in use
        const existingEmployee = await Employee.findOne({ email: employeeData.email });
        if (existingEmployee) {
            throw new Error('Email is already in use');
        }
        const newEmployee = await Employee.create(employeeData);
        return newEmployee;
    } catch (error) {
        throw new Error('Failed to add the new employee', error); // Rethrow the error for handling in the caller
    }
};




// Controller function to create a project with validation
export const createProject = async (projectData) => {
    try {
        // Check if the project code is already in use
        const existingProject = await Project.findOne({ project_code: projectData.project_code });
        if (existingProject) {
            throw new Error('Project code is already in use');
        }
        const newProject = await Project.create(projectData);
        return newProject;
    } catch (error) {
        throw new Error('Failed to add the new project', rror); // Rethrow the error for handling in the caller
    }
};

// Controller function to create a project assignment
// Function to create a project assignment
export const createProjectAssignment = async (projectAssignmentData) => {
    try {
        // Check if the employee ID exists
        const existingEmployee = await Employee.findById(projectAssignmentData.employee_id);
        if (!existingEmployee) {
            throw new Error('Employee ID does not exist');
        }
        
        // Check if the project code exists
        const existingProject = await Project.findOne({ project_code: projectAssignmentData.project_code });
        if (!existingProject) {
            throw new Error('Project code does not exist');
        }
        
        // Create the project assignment
        const newProjectAssignment = await ProjectAssignment.create(projectAssignmentData);
        return newProjectAssignment;
    } catch (error) {
        throw error; // Rethrow the error for handling in the caller
    }
};

