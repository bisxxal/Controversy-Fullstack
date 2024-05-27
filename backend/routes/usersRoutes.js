import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addRemoveFriend, allfriends, getUser, getUserFriends } from "../controllers/userControllers.js";
 

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.post("/allfriends", allfriends );
router.patch("/:id/:friendId", addRemoveFriend);


export default router;