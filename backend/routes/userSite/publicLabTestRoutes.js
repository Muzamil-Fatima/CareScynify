import express from "express";

import {
  getLabTest,
  getLabTestById,
  searchLabTest,
  filterLabTest,
  getLabTestsByLaboratory
} from "../../controllers/userSite/publicLabTestController.js";

const router = express.Router();

// all test
router.get("/", getLabTest);

// search test
router.get("/search", searchLabTest);

// filter test
router.get("/filter", filterLabTest);

// test profile
router.get("/:id", getLabTestById);
// lab all test
router.get("/laboratory/:labId", getLabTestsByLaboratory);
export default router;
