
import job from "../models/job.js";

// Get all jobs

export const getAllJobs = async (req, res) => {
  try {
    // Assuming you have a Job model to fetch jobs from the database
    const jobs = await job.find({visible: true}).populate({
      path: 'company',
      select : '-password'
    });

    res.status(200).json(jobs.length === 0 ? {
      success: false,
      message: "No jobs found"
    } : {
      success: true,
      message: "All jobs fetched successfully",
      jobs
    });
  } catch (error) {
    console.error("Get all jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all jobs",
      error: error.message
    });
  }
}

//get single jon by id
export const getJobById = async (req, res) => {
    try {

      const jobWithId = req.params.id;
      // Assuming you have a Job model to fetch a job by ID from the database
    const job = await job.findById(jobWithId).populate({
      path: 'company',
      select : '-password'
    });

    if(!job){
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }

        res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            job
        });
        
    } catch (error) {
        console.error("Get job by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching job by ID",
            error: error.message
        }); 
    }

}