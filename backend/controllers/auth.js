import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: '15d' })
} 
export const login = async (req, res)=>{
    try {
        const {email,password} = req.body;
 
        const user  = await userModel.findOne({email})
        if(!user){
            return res.json({success:false ,message:"User not exist"})
          }
          const cheakPassword = await bcrypt.compare(password ,  user.password)
          if(!cheakPassword){
            if (!cheakPassword) return res.status(400).json({ message: "Invalid credentials. " });
          }

          const token = createToken(user._id);
          delete user.password;
          const { password: _, ...userWithoutPassword } = user.toObject();
          res.status(200).json({success:true, token, user: userWithoutPassword });

    } catch (error) {
        console.log("error in login routes=>>>>> ",error);
        return res.json({success:false ,message:"login Error"})
    }
}
export const register = async (req,res) => { 
  try {
    const {firstName,lastName,email,password,location,occupation} = req.body; 
    let image_fileName = `${req.file.filename}`;
      const existUser  = await userModel.findOne({email})
      if(existUser){
          return res.json({success:false ,message:"User Already exist"})
        }
        if(password.length < 6 ){
          return res.json({success:false ,message:"Please enter a strong password"})
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password,salt)

      const user = new userModel({ 
        firstName,lastName,email,password:passwordHash,location,occupation,
        picturePath:image_fileName,
        viewedProfile:Math.floor(Math.random() * 10000),impressions:Math.floor(Math.random() * 10000)
      })

      const savedUser = await user.save();
      const token = createToken(savedUser._id)
      const { password: _, ...userWithoutPassword } = savedUser.toObject();

      res.status(201).json({ success:true ,token, user: userWithoutPassword });
 
  } catch (error) {
    console.log("error in register routes=>>>>> ",error);
    return res.json({success:false ,message:'error'})
  }
};
 