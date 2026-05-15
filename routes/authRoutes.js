import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/authController.js";

router.post("/register", (req, res) => {
  registerUser();
});

router.post("/login", (req, res) => {
  res.send("Login Route");
});

export default router;
