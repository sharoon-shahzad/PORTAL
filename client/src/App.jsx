import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
  

function App() {
  const {isRecruiterLoggedIn} = useContext(AppContext)

  return (
    <div>
     { isRecruiterLoggedIn ? <RecruiterLogin/> : null}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} /> 
        <Route path='/applications' element={<Application />} />
      </Routes>
    </div>
  )
}

export default App