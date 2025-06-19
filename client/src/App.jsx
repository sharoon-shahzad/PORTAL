import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import Dashboard from './pages/Dashboard'
import 'quill/dist/quill.snow.css';

function App() {
  const {isRecruiterLoggedIn} = useContext(AppContext)

  return (
    <div>
     { isRecruiterLoggedIn ? <RecruiterLogin/> : null}
     <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} /> 
        <Route path='/applications' element={<Application />} />
        <Route path='/dashboard' element = {<Dashboard/>}>
          <Route path='add-job' element = {<AddJob/>}/>
          <Route path='ManageJobs' element={<ManageJobs/>} />
          <Route path='ViewApplications' element ={<ViewApplications/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App