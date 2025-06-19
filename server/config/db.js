import mongoose from 'mongoose'

const redactPassword = (uri) => uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)[^@]+(@)/, '$1<password>$2');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables')
        }

        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB successfully")
        })

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err)
        })

        console.log("Attempting to connect to MongoDB with URI:", redactPassword(process.env.MONGODB_URI));
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        console.error("Full error:", error)
        if (process.env.MONGODB_URI) {
            console.error("Connection string used:", redactPassword(process.env.MONGODB_URI));
        }
        process.exit(1)
    }
}

export default connectDB