import userModel from "../models/userModel.js";

export const getUser = async(req,res)=>{
    try {
        const{id}= req.params 
        const user =await userModel.findById(id)
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getuser routes=>>>",error);
         res.status(404).json({message:error.message})
    }
} 
export const allfriends = async(req,res)=>{
    try{
        const{id}= req.body 
        const allFriend = await userModel.find({ _id: { $ne: id } }, '_id firstName lastName picturePath location occupation');
        res.status(200).json({allFriend}); 
    }
    catch (error) {
        console.log("error in allfriends routes=>>>",error);
         res.status(404).json({message:error.message})
    }
}
export const getUserFriends = async (req,res)=>{
    try {
        const{id}= req.params 
        const user =await userModel.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>userModel.findById(id))
        );
        const formatedFriends = friends.map( ({_id , firstName,lastName,picturePath,location,occupation })=>{
           
                return{
                    _id , firstName,lastName,picturePath,location,occupation
                }
            }
        );
        res.status(200).json(formatedFriends)
    } catch (error) {
        console.log("error in getUserFriends routes=>>>",error);
         res.status(404).json({message:error.message})
        }
    }
    export const addRemoveFriend =async (req,res)=>{
        try {
            const{id ,friendId}= req.params
            const user =await userModel.findById(id);
            const friend =await userModel.findById(friendId);

            if(user.friends.includes(friendId)){

                user.friends = user.friends.filter((id) => id !== friendId)
                friend.friends = friend.friends.filter((id) => id !== id)
            }
            else{
                user.friends.push(friendId)
                friend.friends.push(id)
            }
            await user.save();
            await friend.save();
            
            const friends = await Promise.all(
                user.friends.map((id)=>userModel.findById(id))
            );
            const formatedFriends = friends.map( ({_id , firstName,lastName,picturePath,location,occupation })=>{
               
                    return{
                        _id , firstName,lastName,picturePath,location,occupation
                    }
                }
            );
            res.status(200).json(formatedFriends)
        } catch (error) {
    console.log("error in addremovefriend routes=>>>",error);
    res.status(404).json({message:error.message})
    }
}