import { Router } from "express";
import { login } from "../controllers/AuthController";
import authMiddleware from "../middlewares/AuthMiddleware";
import { destroy, index, show, store, update } from "../controllers/ChatGroupController";
import { index as ChatGroupUserIndex , store as ChatGroupUserStore} from "../controllers/ChatGroupUserController";
import { chats } from "../controllers/ChatsController";

const router = Router()

// Authentication
router.post('/auth/login', login)


//chat groups routes
router.get('/chat-group', authMiddleware, index)
router.get('/chat-group/:id', show)
router.post('/chat-group', authMiddleware, store)
router.put("/chat-group/:id", authMiddleware, update);
router.delete("/chat-group/:id", authMiddleware,destroy);

// * Chat group user
router.get("/chat-group-user", ChatGroupUserIndex);
router.post("/chat-group-user", ChatGroupUserStore);


// * Chats
router.get("/chats/:groupId", chats);

export default router;
