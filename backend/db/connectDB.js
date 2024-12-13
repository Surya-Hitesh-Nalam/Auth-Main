import mongoose, { mongo } from "mongoose"

export const connectDB = async()=>{
try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log("Monog is success")
} catch (error) {
    console.log("error in connectiong mongo",error)
    process.exit(1)
}

}