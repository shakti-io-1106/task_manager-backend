import express from "express";
const router = express.Router();
import { loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
