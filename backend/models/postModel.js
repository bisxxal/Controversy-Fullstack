import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    views:Number,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
} ,{timestamps:true})

const postModel = mongoose.model('post' , postSchema)

export default postModel