import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables')
        }

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB successfully")
        })

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err)
        })

        await mongoose.connect(process.env.MONGO_URI)
        
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }
}

export default connectDB