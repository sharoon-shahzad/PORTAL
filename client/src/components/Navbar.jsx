import React ,{useContext} from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate() 

  const {isRecruiterLoggedIn, setIsRecruiterLoggedIn} = useContext(AppContext)

  return (
    <header className="shadow-md bg-white text-black">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img 
            onClick={() => navigate("/")} 
            className="h-10 object-contain cursor-pointer" 
            src={assets.logo} 
            alt="logo" 
          />
        </Link>

        {/* Navigation Content */}
        {isLoaded && user ? (
          <div className="flex items-center gap-6 max-sm:gap-3 text-sm max-sm:text-xs">
            <Link
              to="/applications"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Applied Jobs
            </Link>
            <p className="text-gray-600 hidden sm:inline">
              Hi, <span className="font-medium">{user.firstName} {user.lastName}</span>
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:gap-2 text-sm max-sm:text-xs">
            <button onClick={() => setIsRecruiterLoggedIn(true)} className="bg-p-2 rounded hover:opacity-90 transition-all">
              Recruiter
            </button>
            <button
              onClick={() => openSignIn?.()}
              className="bg-primary text-blue-600 px-4 py-2 rounded hover:opacity-90 transition-all"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
