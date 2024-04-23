import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    project_code: { type: String, required: true },
    project_name: { type: String, required: true },
    project_description: { type: String, required: true },
}, {collection: 'Project'});


const Project = mongoose.model('Project', projectSchema);

export default Project;