import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import { jobsApplied } from '../assets/assets'
import moment from 'moment'

const Applications = () => {
  const [isEdited, setIsEdited] = useState(false)
  const [resumeData, setResumeData] = useState(null)

  const handleEdit = () => {
    setIsEdited(true)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEdited(false)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Resume</h2>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {isEdited ? (
            <div className="space-y-4">
              <label htmlFor="resumeUpload" className="flex flex-col items-center gap-4 cursor-pointer">
                <p className="text-gray-600">Select Resume</p>
                <input 
                  onChange={e => setResumeData(e.target.files[0])} 
                  id="resumeUpload" 
                  accept="application/pdf" 
                  type="file"
                  className="hidden" 
                />
                <div className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-sky-500 transition-colors">
                  <img src={assets.profile_upload_icon} alt="Upload" className="w-8 h-8" />
                  <span className="text-gray-600">Click to upload resume</span>
                </div>
              </label>
              <button 
                onClick={handleSave}
                className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <a 
                href="#" 
                className="text-sky-600 hover:text-sky-700 flex items-center gap-2"
              >
                <img src={assets.profile_upload_icon} alt="Resume" className="w-5 h-5" />
                Resume
              </a>
              <button 
                onClick={handleEdit}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Jobs Applied</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobsApplied.map((job, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={job.logo} alt={job.company} className="h-10 w-10 rounded-full mr-3" />
                        <span className="text-sm font-medium text-gray-900">{job.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {moment(job.date).format('DD-MM-YYYY')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${job.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                          job.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Applications