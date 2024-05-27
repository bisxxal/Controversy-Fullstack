import mongoose from "mongoose";

const connection = async()=>{
    try {
       await mongoose.connect(process.env.MONGOOSE_URL) .then(()=> console.log("db connected"));
    } catch (error) {
        console.log("connnectionnn error in mongooess==>>")
    }
}
export default connection