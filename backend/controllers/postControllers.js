import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const createPost = async(req ,res)=>{
    try {
        
        let image_fileName = req.file?`${req.file.filename}`:null;
        const{userId , description} =req.body;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const user  = await userModel.findById(userId)
        const newPost = new postModel({
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath:image_fileName,
            likes:{},
            views:Math.floor(Math.random() * 1000),
            comments:[],
            userId
        })
        await newPost.save()
        const posts = await postModel.find()
        
        res.status(201).json(posts);
        // res.status(201).json(user);
    } catch (error) {
        console.log("erorr in create post routees=>>",error);
        res.status(404).json({success:true ,message:"error"})
    }
}
export const getFeedPosts = async(req ,res)=>{
    try {
        const post = await postModel.find()
        
        res.status(201).json({sucess:true, post});
        
    } catch (error) {
         console.log("erorr in get post routees=>>",error);
        res.status(404).json({message:"error"})
    }
}
export const getUserPosts = async(req ,res)=>{
    try {
        const {userId} = req.params
        // console.log(userId);
        const post = await postModel.find({userId})
        // if (!post.length) {
        //     return res.status(404).json({success:false, message: "No posts found for this user" });
        // }
        // console.log(post);
        res.status(201).json({success:true,post});
        
    } catch (error) {
         console.log("erorr in get user post routees=>>",error);
        res.status(404).json({success:false,message:"error"})
    }
}
export const likePost = async(req ,res)=>{
    try {
        const { id } = req.params;
        const { userId } = req.body;
          
        const post = await postModel.findById(id);

        if (!post) { 
            return res.status(404).json({ message: "Post not found" });
        }
        
        if (!post.likes) { 
            post.likes = new Map();
        }
         const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId)
        }
        else{
            post.likes.set(userId ,true)  
        }

        const updatedPost = await postModel.findByIdAndUpdate(id ,{likes:post.likes} ,{new:true})
         res.status(200).json(updatedPost) 
    } catch (error) {
         console.log("erorr in like post routees=>>",error);
        res.status(404).json({message:"error"})
    }
}
export const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body; 
        if (!userId || !comment) {
            return res.status(400).json({ message: "userId and comment are required" });
        }
        
        const post = await postModel.findById(id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
         
        post.comments.push({ comment });
         
        const updatedPost = await post.save();
        
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log("Error in commentPost route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

