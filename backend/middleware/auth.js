import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next)=>{
   try {
     const {token} = req.headers;  
     if(!token){
        return res.json({success:false ,message:"Not Authrized Login Agin"})
     }
     const token_decode = jwt.verify(token ,process.env.JWT_SECRET)
     req.body.userId= token_decode.id 
     next()
   } catch (error) {
    console.log("error in middleWare =>>>>",error);
    return res.json({success:false,message:'error'})
   }
}
export default authMiddleware