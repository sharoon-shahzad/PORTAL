import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loding";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import moment from "moment";
import JobCard from "../components/JobCard";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState(null);
  const { jobs } = useContext(AppContext);

  console.log('Current Job ID:', id);
  console.log('All Jobs:', jobs);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    console.log('Filtered Job Data:', data);
    
    if (data.length > 0) {
      setJobData(data[0]);
      console.log("Selected Job Data:", data[0]);
    } else {
      setError("Job not found");
      console.error("Job not found with id:", id);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  useEffect(() => {
    console.log('Jobs Length:', jobs.length);
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  // Log when jobData changes
  useEffect(() => {
    console.log('JobData Updated:', jobData);
  }, [jobData]);

  // Log filtered jobs for "More jobs" section
  const moreJobs = jobs
    .filter(
      (job) =>
        job._id !== jobData?._id &&
        job.companyId._id === jobData?.companyId._id
    )
    .slice(0, 4);
  
  console.log('More Jobs from Same Company:', moreJobs);

  if (error) {
    console.log('Error State:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return jobData ? (
    <>
      <Navbar />
      <div className="container mx-auto py-8 min-h-screen flex flex-col px-4 2xl:px-20">
        <div className="bg-white text-gray-900 rounded-xl shadow-xl p-6 w-full border border-gray-200 backdrop-blur-md transition-all duration-300">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-6 py-10 bg-sky-100/70 rounded-2xl border border-sky-300 shadow-inner">
            {/* Left: Company Logo & Job Info */}
            <div className="flex flex-col items-center md:flex-row gap-6">
              <img
                className="h-24 w-24 bg-white rounded-xl p-4 border border-gray-200 shadow-md transition-transform hover:scale-105"
                src={jobData.companyId.image}
                alt="Company"
              />

              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
                <h1 className="text-2xl font-semibold text-sky-800">
                  {jobData.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-700">
                  <span className="flex items-center gap-2">
                    <img
                      className="h-4"
                      src={assets.suitcase_icon}
                      alt="Role"
                    />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      className="h-4"
                      src={assets.location_icon}
                      alt="Location"
                    />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img className="h-4" src={assets.person_icon} alt="Level" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img className="h-4" src={assets.money_icon} alt="Salary" />
                    CTC: {jobData.salary}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Apply Button + Time */}
            <div className="flex flex-col justify-between items-center gap-4">
              <button className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:scale-105">
                Apply Now
              </button>
              <p className="text-gray-500 text-sm">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 mt-5">
            {/* Left/Main Content */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10 space-y-8 font-serif text-gray-900 transition-all duration-300 leading-relaxed">
              {/* 1. Main Heading */}
              <h2 className="text-3xl font-bold text-sky-800 underline underline-offset-4 mb-2">
                1. Job Description
              </h2>

              {/* 2. Job Description Content */}
              <div
                className="text-gray-800 text-justify space-y-4 prose max-w-none prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-medium"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />

              {/* 3. Apply Section */}
              <div className="pt-4">
                <button className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-md font-medium shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  🚀 Apply Now
                </button>
              </div>
            </div>

    
            {/* Right Section - More Jobs */}
            <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md border border-gray-200 p-6 h-fit mt-5">
              <h2 className="text-2xl font-bold text-sky-800 underline underline-offset-4 mb-4">
                More jobs from {jobData.companyId.name}
              </h2>
              {moreJobs.map((job, index, array) => (
                <div key={job._id} className="mb-4">
                  <JobCard job={job} />
                  {index !== array.length - 1 && (
                    <hr className="my-4 border-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
