
import express from 'express';
import {RegisterCompany , loginCompany ,getCompanyJobApplicants, changeJobVisibility} from '../controllers/companyController.js';
import { getCompanyData } from '../controllers/companyController.js';
import { postNewJob } from '../controllers/companyController.js';
import { getCompanyPostedJobs } from '../controllers/companyController.js';
import { changeJobApplicationStatus } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register',upload.single('image') , RegisterCompany);  
// done

router.post('/login' , loginCompany);
//done

router.get('/company',protectCompany , getCompanyData);

//done

router.post('/post-job' ,protectCompany, postNewJob);
//done

router.get('/applicants' , protectCompany, getCompanyJobApplicants);

router.get('/list-jobs' , protectCompany, getCompanyPostedJobs);

router.post('/change-status', protectCompany, changeJobApplicationStatus);

router.post('/change-visibility', protectCompany, changeJobVisibility);

export default router;

