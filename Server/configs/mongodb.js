import mongoose from "mongoose";

// connect to the mongodb db

const connectDB = async () => {
    mongoose.connection.on('connected', ()=>{
        console.log('DB connected')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}

export default connectDB