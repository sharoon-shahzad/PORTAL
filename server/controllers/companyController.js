import Company from "../models/Company.js";
import Job from "../models/job.js";
import {v2 as cloudinary} from "cloudinary";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Register Company
export const RegisterCompany = async (req, res) => {
  const {name, email, password} = req.body;

  console.log("Body:", req.body);

  const imageFile = req.file;
  console.log("Image file:", imageFile);

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("hashedPassword:", hashedPassword);

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
    });

    console.log("Company created:", company);
    
    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id) // Use company._id instead of company.id
    });
    console.log("Registration successful:", company);

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering company",
      error: error.message,
    });
  }
};

// Login Company
export const loginCompany = async (req, res) => {
  const {email, password} = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  try {
    const company = await Company.findOne({email});

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Compare password (await is required for bcrypt.compare)
    const isPasswordValid = await bcrypt.compare(password, company.password);

    if (isPasswordValid) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        company: {
          id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id)
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message
    });
  }
};

// getCompanyData
export const getCompanyData = async (req, res) => {
  /*
  This endpoint will be hit by the admin from frontend to get the company data
  the request - > server -> controller -> model -> response
  */
 //! check company exitst in db
 //! if yes then return the company data
 //! if no return error message

 try {
  const companyId = req.company._id; // Assuming req.company is set by middleware

  console.log("Company ID:", companyId);

  const company = await Company.findById(companyId).select("-password");

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found"
    });
  }

  // response to postman
  res.status(200).json({
    success: true,
    message: "Company data fetched successfully",
    company: {
      id: company._id,
      name: company.name,
      email: company.email,
      image: company.image
    }
  });
 } catch (error) {
   console.error("Get company data error:", error);
   res.status(500).json({
     success: false,
     message: "Error fetching company data",
     error: error.message
   });
 }
};

//post a new job
export const postNewJob = async (req, res) => {
  try {

    //testing the incoming data
    const {title , description , location , salary , category , level} = req.body;

    console.log("Body:", req.body);

    if (!title || !description || !location || !salary || !category || !level) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const companyId = req.company._id;

    // console.log("testing company from console:", companyId, {
    //   title,
    //   description,
    //   location,
    //   salary
    // });

    // Create newJob
    const newJob = await Job.create({
      title,
      description,
      location,
      salary,
      company: companyId,
      category,
      level,
    });

    await newJob.save();


    console.log("Job created:", newJob);
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: {
        id: newJob._id,
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        salary: newJob.salary,
        company: newJob.company
      }
    });
    // res.status(201).json({
    //   success: true,
    //   message: "Job posted successfully",
    //   // job
    // });

  } catch (error) {
    console.error("Post job error:", error);
    res.status(500).json({
      success: false,
      message: "Error posting job",
      error: error.message
    });
  }
};

// get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.user.id;
    
    // Implementation depends on your models structure
    // const applicants = await JobApplication.find({ companyId }).populate('userId jobId');

    res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      // applicants
    });

  } catch (error) {
    console.error("Get applicants error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching applicants",
      error: error.message
    });
  }
};


   //! Todo : adding no. of applicants info in each job posted by company
export const getCompanyPostedJobs = async (req, res) => {
  try {

    const companyId = req.company._id; // Assuming req.company is set by middleware

    console.log("Company ID:", companyId);

    const jobs = await Job.find({
      company: companyId
    })

 
    res.status(200).json({
      success: true,
      message: "Company jobs fetched successfully",
      jobs: jobs.map(job => ({
        id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        category: job.category,
        level: job.level,
        visible: job.visible
      }))
    });
  } catch (error) {
    console.error("Get posted jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching posted jobs",
      error: error.message
    });
  }
};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    // Update application status
    // const application = await JobApplication.findByIdAndUpdate(
    //   applicationId,
    //   { status },
    //   { new: true }
    // );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      // application
    });

  } catch (error) {
    console.error("Change application status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating application status",
      error: error.message
    });
  }
};

// change job status //! handle properly
export const changeJobVisibility = async (req, res) => {
  try {

    const {id} = req.body

    const companyId = req.company._id;

    const job = await Job.findById(id);

    if(companyId.toString() === job.company.toString()){
      job.visible = !job.visible
    }
    await job.save();



    res.status(200).json({
      success: true,
      message: "Job visibility updated successfully",
      // job
    });

  } catch (error) {
    console.error("Change job visibility error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating job visibility",
      error: error.message
    });
  }
};