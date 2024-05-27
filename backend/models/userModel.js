import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:30
    },
    lastName:{
        type:String,
        required:true,
        max:30
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:30
    },
    password:{
        type:String,
        min:3,
        required:true,
    },
    friends: {
        type: Array,
        default: [],
      },
      picturePath:{
        type:String,
        default:""
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
},{timestamps:true})

const userModel=mongoose.model("User" ,userSchema);
export default userModel