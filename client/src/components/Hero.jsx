import React, { useRef } from 'react';
import { assets } from '../assets/assets'; // make sure this path is correct
import { AppContext } from '../context/AppContext';
const Hero = () => {

  const {setSearchFilter ,setIsSearched} = React.useContext(AppContext);


  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleOnSearch = () => {
    const title = titleRef.current.value.trim();
    const location = locationRef.current.value.trim();

    // Set the search filter in the context
    setSearchFilter({ title, location });

    // Set the search state to true
    setIsSearched(true);

    // Optionally, you can clear the input fields after search
    // titleRef.current.value = '';
    // locationRef.current.value = '';
  }

  return (
    <section className="bg-gradient-to-r from-indigo-200 via-white to-purple-200 py-16">

      <div className="container mx-auto px-4 md:px-8 text-center">
        {/* Headings */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Over <span className="text-blue-600">1000+</span> Jobs Available
        </h2>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Your dream job is just a click away.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white shadow-lg rounded-xl p-4 w-full max-w-3xl mx-auto">
          {/* Job Input */}
          <div className="flex items-center w-full md:w-1/2 gap-2">
            <img src={assets.search_icon} alt="search" className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full p-2 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              ref={titleRef}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center w-full md:w-1/2 gap-2">
            <img src={assets.location_icon} alt="location" className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Enter location..."
              className="w-full p-2 text-sm rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button onClick={handleOnSearch} className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2 rounded w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
