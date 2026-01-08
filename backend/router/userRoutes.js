import express from "express";

const router = express.Router();

// Test route (you can remove later)
router.get("/test", (req, res) => {
  res.json({ message: "User routes working" });
});

export default router;
