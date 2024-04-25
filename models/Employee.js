import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {collection: 'Employee'});


const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;

