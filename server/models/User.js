import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Remove custom _id - let MongoDB handle it automatically
    // OR if you need custom _id, don't make it required in schema

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    resume:{
        type:String,
        required: true
    },
    image: {
        type: String,
        required: false  // Make optional since file upload might fail
        // OR store as Buffer if storing actual file data
        // type: Buffer
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

const User = mongoose.model('User', userSchema);

export default User;