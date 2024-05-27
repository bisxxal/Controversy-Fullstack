import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; 
import path from "path"; 
import connection from "./db/connection.js";
import { register } from "./controllers/auth.js";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/usersRoutes.js'
import postRoutes from './routes/postRoutes.js'
import {createPost} from './controllers/postControllers.js' 
import bodyParser from "body-parser";
const app = express() 
dotenv.config(); 
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  connection()
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
        },
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
 
app.use ('/images' , express.static('uploads'))
app.post("/auth/register", upload.single("image"),register);
app.post("/posts",upload.single("image"), createPost); //put authMiddleWear here

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running ${PORT}`); 
}) ;