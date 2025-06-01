import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { JobCategories, JobLocations, jobsData } from "../assets/assets";
import JobCard from "./JobCard"; // Ensure default export matches
import { Pagination } from "@mui/material";

const JobListings = () => {

  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  console.log('Initial Jobs Data:', jobs);

  const [showFilter, setShowFilter] = React.useState(true);

  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const [selectedLocation, setSelectedLocation] = React.useState([]);


  const [filteredJobs, setFilteredJobs] = React.useState(jobs);


  const [page, setPage] = React.useState(1);
  const jobsPerPage = 6;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  const handleRemove = () => {
    setSearchFilter((prevstate) => ({ ...prevstate, title: "", location: "" }));
  };

  function handleToggleFilter() {
    setShowFilter(prevstate => !prevstate)
  }

  const handleCategoryChange = (e, category) => {
    setSelectedCategory(prevState => {
      const newState = prevState.includes(category) 
        ? prevState.filter(c => c !== category)
        : [...prevState, category];
      console.log('Selected Categories:', newState);
      return newState;
    });
  }

  const handleLocationChange = (e, location) => {
    setSelectedLocation(prevloc => {
      const newState = prevloc.includes(location) 
        ? prevloc.filter(l => l !== location) 
        : [...prevloc, location];
      console.log('Selected Locations:', newState);
      return newState;
    });
  }



    useEffect(() => {
      console.log('Filter States:', {
        selectedCategory,
        selectedLocation,
        searchFilter
      });

      const matchesCategory = (job) => {
        return selectedCategory.length === 0 || selectedCategory.includes(job.category);
      }

      const matchesLocation = (job) => {
        return selectedLocation.length === 0 || selectedLocation.includes(job.location);
      }
      
      const matchesTitle = (job) => {
        return searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
      }
      const matchesSearchLocation = (job)=>{
        return searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
      }
      const newFilteredJobs  = jobs.slice().reverse().filter( job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job));

      console.log('Filtered Jobs Count:', newFilteredJobs.length);
      console.log('Filtered Jobs:', newFilteredJobs);

      setFilteredJobs(newFilteredJobs);

      setPage(1);
    }, [jobs, selectedCategory, selectedLocation, searchFilter])

    // Add console.log for pagination data
    console.log('Pagination Info:', {
      currentPage: page,
      totalPages: Math.ceil(filteredJobs.length / jobsPerPage),
      jobsPerPage,
      currentPageJobs: paginatedJobs
    });






  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row gap-6 py-8 ">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-xl p-6">
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600 space-y-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      onClick={handleRemove}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      onClick={handleRemove}
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="Remove"
                    />
                  </span>
                )}
              </div>
            </>
          )}

          <button className="bg-primary text-black px-6 py-1.5 rounded border border-primary lg:hidden" onClick={handleToggleFilter}>{showFilter ? "Hide Filter" : "Show Filter"}</button>

        {/* Category Filter */}
        <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
          <h4 className="font-medium text-lg py-4">Search By Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input 
                  onChange={(e) => handleCategoryChange(e, category)} 
                  checked={selectedCategory.includes(category)}
                  className="scale-125" 
                  type="checkbox"
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
          <h4 className="font-medium text-lg py-4 pt-14">Search By Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input onChange={(e) => handleLocationChange(e, location)} 
                checked={selectedLocation.includes(location)}
                className="scale-125" type="checkbox" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">Latest Jobs</h3>
        <p className="mb-8">Get your Desired Job</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12">
          <Pagination 
            count={Math.ceil(filteredJobs.length / jobsPerPage)} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
      </section>
    </div>
  );
};

export default JobListings;
