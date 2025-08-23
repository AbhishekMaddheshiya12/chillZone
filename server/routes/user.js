import express from "express";
import authMiddleware from "../middleware/auth.js";
import { aboutMe, login, logOut, signUp, updateProfile } from "../controllers/user.js";
import { createGroup, getChatDetails, getMembers, getMessages, getMyChats, groupByMe, joinGroup, sendAttachment } from "../controllers/chat.js";
import { multerUpload } from "../middleware/multer.js";
const router = express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.post("/createGroup",authMiddleware,createGroup);
router.post("/joinGroup",authMiddleware,joinGroup);
router.get("/getChatDetails/:chatId",authMiddleware,getChatDetails);
router.get("/getMyChats",authMiddleware,getMyChats);
router.get("/getmembers/:chatId",getMembers);
router.get("/groupbyme",authMiddleware,groupByMe);
router.get("/me",authMiddleware,aboutMe);
router.post("/sendfiles",multerUpload.array("files",5),authMiddleware,sendAttachment);
router.get("/getMessages/:chatId",getMessages)
router.post('/update-profile', multerUpload.single("avatar"),authMiddleware, updateProfile);
router.get('/logOut',authMiddleware,logOut);


export default router;