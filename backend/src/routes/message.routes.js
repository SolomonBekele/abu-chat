import express from "express"
import { sendMessage,getMessages, markMessageAsSeen} from "../controller/message.controller.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()

router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.post("/seen/:id",protectRoute,markMessageAsSeen)

export default router;