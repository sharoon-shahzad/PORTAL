import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {


  const navigate = useNavigate();
  



  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-6 flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={assets.company_icon}
          alt="Company Logo"
          className="w-12 h-12 object-contain rounded-md"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
          <div className="text-sm text-gray-500 flex gap-3 mt-1">
            <span>{job.location}</span>
            <span className="border-l border-gray-300 pl-3">{job.level}</span>
          </div>
        </div>
      </div>

      <p
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 100) + '...',
        }}
      ></p>

      <div className="flex gap-3 mt-4">
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition">
          Apply Now
        </button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm px-4 py-2 rounded-lg transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
