
import express from 'express';
import { getAllJobs, getJobById } from '../controllers/jobController.js';


const router =  express.Router();


//Route to get the all jobs data

router.get("/",getAllJobs)

// Route to get the single job data using :/id 


router.get("/:id",getJobById)

export default router;