import express from "express";
import authMiddleware from "../middleware/auth.js"; 
import { commentPost, getFeedPosts, getUserPosts, likePost } from "../controllers/postControllers.js"; 
const router = express.Router();

router.get("/",authMiddleware , getFeedPosts);
router.get("/:userId/posts", authMiddleware ,getUserPosts);
router.patch("/:id/like",authMiddleware , likePost);
router.patch("/:id/comment", authMiddleware ,commentPost);

export default router;