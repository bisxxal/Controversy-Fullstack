import express from "express";
import authMiddleware from "../middleware/auth.js"; 
import { commentPost, getFeedPosts, getUserPosts, likePost } from "../controllers/postControllers.js"; 
const router = express.Router();

router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", likePost);
router.patch("/:id/comment", commentPost);

export default router;