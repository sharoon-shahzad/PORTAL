

import User from '../models/User.js';
import JobApplication from '../models/JobApplication.js';
import Job from '../models/job.js';
import {v2 as cloudinary} from 'cloudinary';



//get user data
export const getUserData = async (req, res) => {
  try {

    const userId = req.auth.userId

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image
      }
    });
  } catch (error) {
    console.error("Get user data error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message
    });
  }
}


//post:  user apply for a job
export const applyForJob = async(req, res) =>{

    const {jobId} = req.body;

    const userId = req.auth.userId;

    try {
        const isAlreadyApplied = await User.find({jobId , userId})

        console.log("isAlreadyApplied:", isAlreadyApplied);
        // Check if the user has already applied for the job

        if(isAlreadyApplied.length > 0){
            return res.json({
                success: false,
                message: "You have already applied for this job"
            })
        }

        const jobdata = await Job.findById(jobId);
        if (!jobdata) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        res.json({
            success: true,
            message: "Job application submitted successfully",
        });

        await JobApplication.create({
            jobId: jobId,
            userId: userId,
            companyId: jobdata.company
        });

    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({
            success: false,
            message: "Error applying for job",
            error: error.message
        });
    }
};

// get user applied application

export const getUserJobApplications = async (req, res) => {
    const userId = req.auth.userId;

    try {
        const applications = await JobApplication.find({ userId })
        .populate('companyId' , 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()
        if(!applications){
            return res.status(404).json({
                success: false,
                message: "No job applications found for this user"
            });
        }
        res.status(200).json({
            success: true,
            message: "User job applications fetched successfully",
            applications
        });
    } catch (error) {
        console.error("Error fetching user job applications:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user job applications",
            error: error.message
        });
    }
};

// update user profile (resume)
export const updateUserResume = async ()=>{
    try {
        const userId = req.auth.userId

        const resumeFile = req.resumeFile

       const userData =  await User.findById(userId);

       if(resumeFile){
        const resumeUpload = await cloudinary.uploader.upload(resumeFile);
        userData.resume = resumeUpload.secure_url
       }

       await userData.save()

    } catch (error) {
        console.error("Error updating user resume:", error);
        res.status(500).json({
            success: false,
            message: "Error updating user resume",
            error: error.message
        });
    }
};