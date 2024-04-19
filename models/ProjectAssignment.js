import mongoose from 'mongoose';

const projectAssignmentSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    project_code: { type: String, required: true },
    start_date: { type: String, required: true },
}, {collection: 'ProjectAssignment'});


const ProjectAssignment = mongoose.model('ProjectAssignment', projectAssignmentSchema);

export default ProjectAssignment;