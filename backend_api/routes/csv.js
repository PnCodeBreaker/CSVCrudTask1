import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createCSV, getCSV, updateCSV, deleteCSV } from "../controllers/csv.js";

router.post("/", auth, createCSV);
router.get("/", auth, getCSV);
router.patch("/update/:id", auth, updateCSV);
router.delete("/delete/:id", auth, deleteCSV);

export default router;

/* 
    These Routes are for uploading and parsing the csv data and mapping it and pushing to mongoose collection 
    Also a auxialry Collection is created for Storing the Names and userID of the uploaded CSV file and 
    each individual CSV Content Data is Stored into another CSVContent Model where all the CSV Content Data 
    by all the users or different csv file data is stored but is mapped through objectID of CSV file ID.
*/