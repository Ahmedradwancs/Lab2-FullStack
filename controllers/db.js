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

//function to create a new project assignment
export const createProjectAssignment = async (req, res) => {
    try {
        const data = await ProjectAssignment.create(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error creating project assignment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//function to create a new employee
export const createEmployee = async (req, res) => {
    try {
        const data = await Employee.create(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//function to create a new project
export const createProject = async (req, res) => {
    try {
        const data = await Project.create(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

