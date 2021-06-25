import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createCSVContent, getCSVContent, updateCSVContent, deleteCSVContent } from '../controllers/csvContents.js'

router.post("/:csvId", auth, createCSVContent);
router.get("/:csvId", auth, getCSVContent);
router.patch("/update/:csvContentId", auth, updateCSVContent);
router.delete("/delete/:csvContentId", auth, deleteCSVContent);

export default router;

/* These Routes are for CRUD operation on the each individual CSV Data that is parsed */