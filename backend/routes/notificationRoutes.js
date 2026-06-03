import express from "express";
import {
  create,
  getAll,
  markRead,
} from "../controllers/notification.controller.js";

import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, getAll);
router.patch("/:id/read", auth, markRead);

export default router;