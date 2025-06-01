import { createContext, useEffect, useState } from "react"
import { jobsData } from "../assets/assets";


export const AppContext = createContext()


//? This AppContext is  used to create the Context(states and functions) for entire applicatio instead of using props everywhere
export const AppContextProvider = ({ children }) => {
     //? The value object contains all the states and functions that we want to share across components
     //? By passing this object to the Provider's value prop, any child component can access these shared resources
     //? This eliminates prop drilling and makes state management more centralized and efficient

     const [searchFilter , setSearchFilter] = useState({
          title: "",
          location: ""
     });

     const [jobs, setJobs] = useState([]);  

     const [isRecruiterLoggedIn , setIsRecruiterLoggedIn] = useState(false)

     //fetch Job data
     const fetchJobs = async ()=>{
          setJobs(jobsData);
     }

     useEffect(()=>{
          fetchJobs();
     },[])

     const [isSearched , setIsSearched] = useState(false);

     const value = {
        setSearchFilter , searchFilter ,
         isSearched , setIsSearched,
         jobs, setJobs ,
         isRecruiterLoggedIn , setIsRecruiterLoggedIn
     }

     return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
     )
}