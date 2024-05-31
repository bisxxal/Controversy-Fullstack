import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addRemoveFriend, allfriends, getUser, getUserFriends } from "../controllers/userControllers.js";
 

const router = express.Router();

router.get("/:id", getUser);
router.post("/allfriends",authMiddleware, allfriends );
router.get("/:id/friends",authMiddleware, getUserFriends);
router.patch("/:id/:friendId" , addRemoveFriend);


export default router;