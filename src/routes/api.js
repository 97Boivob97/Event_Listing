import express from "express";
import home from "../controllers/homeController.js";
import { registration,login } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { createEvent,allEvents,eventById,updateEvent,deleteEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/",auth,home);
router.post("/registration",registration);
router.post("/login",login);
router.post("/events",auth,createEvent);
router.get("/events",allEvents);
router.get("/events/:id",eventById);
router.put("/events/:id",auth,updateEvent);
router.delete("/events/:id",auth,deleteEvent);

export default router;