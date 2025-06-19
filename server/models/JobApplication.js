
import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true

    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
export default JobApplication;