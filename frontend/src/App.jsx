import React, { useEffect } from 'react';
import LoginSignUp from './pages/LoginSignUp';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import JobApplyPage from './pages/JobApplyPage';
import Brower from './pages/Brower';
import Companies from './pages/Admin/Companies';
import Jobs from './pages/Admin/Jobs';
import RegisterCompany from './pages/Admin/RegisterCompany';
import UpdateCompanyDetails from './pages/Admin/UpdateCompanyDetails';
import PostJobs from './pages/Admin/PostJobs';
import Application from './pages/Admin/Application';
import ProtectRoute from './pages/Admin/ProtectRoute';

const App = () => {
  return (
    <div className='' >
      <Routes>
        <Route path='/auth' element={<LoginSignUp />} ></Route>
        <Route path='/' element={<HomePage />} ></Route>
        <Route path='/jobs' element={<JobsPage />} ></Route>
        <Route path='/profile' element={<ProfilePage />} ></Route>
        <Route path='/about' element={<AboutPage />} ></Route>
        <Route path='/jobs/:id' element={<JobApplyPage />} ></Route>
        <Route path='/search' element={<Brower />} ></Route>

        {/* Admin */}
        <Route path='/admin/companies' element={<ProtectRoute><Companies /></ProtectRoute>} ></Route>
        <Route path='/admin/jobs' element={<ProtectRoute><Jobs /></ProtectRoute>} ></Route>
        <Route path='/admin/jobs/post' element={<ProtectRoute><PostJobs /></ProtectRoute>} ></Route>
        <Route path='/admin/jobs/:id/edit' element={<ProtectRoute><PostJobs /></ProtectRoute>} ></Route>
        <Route path='/admin/jobs/:id/applicant' element={<ProtectRoute><Application/></ProtectRoute>} ></Route>
        <Route path='/admin/companies/create' element={<ProtectRoute><RegisterCompany /></ProtectRoute>} ></Route>
        <Route path='/admin/companies/:id/update' element={<ProtectRoute><UpdateCompanyDetails /></ProtectRoute>} ></Route>

      </Routes>
    </div>

  )
}

export default App