import express from "express";

import {
  getLaboratories,
  getLaboratoryById,
  searchLaboratories,
  filterLaboratories,
} from "../../controllers/userSite/publicLabController.js";

const router = express.Router();

// all laboratories
router.get("/", getLaboratories);

// search laboratories
router.get("/search", searchLaboratories);

// filter laboratories
router.get("/filter", filterLaboratories);

// laboratory profile
router.get("/:id", getLaboratoryById);

export default router;
