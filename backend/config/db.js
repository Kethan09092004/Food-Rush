import mongoose from "mongoose"
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kethan09092004:VecJ9DeaaOH9smzt@cluster0.ft0ic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("DB is Connected")
    })
} 
