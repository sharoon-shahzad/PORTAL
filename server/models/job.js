import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    category:{
        type:String,
        required: true,
    },
    level :{
        type:String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
