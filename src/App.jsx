import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './assets/Components/Login/Login'
import Dashboard from './assets/Components/MainPage/Dashboard/Dashboard'
import Admin from './assets/Components/Admin/admin'
import Users from './assets/Components/MainPage/Users/Users'
import Booths from './assets/Components/MainPage/Booths/Booths'
import Reports from './assets/Components/MainPage/Reports.jsx/Reports'

import BoothList from './assets/Components/MainPage/Booths/BoothList'
import Page from './assets/Components/MainPage/Page/page'
import DataTable from './assets/Components/data/Data'
import AdminDashboard from './assets/Components/Admin/AdminDashboard'
import DisplayUsers from './assets/Components/Admin/DisplayUsers';
import DisplayMandals from './assets/Components/Admin/DisplayMandals'
import DisplayVillages from './assets/Components/Admin/DisplayVillages';
import DisplayWards from './assets/Components/Admin/DispalyWards';
import DisplayBooths from './assets/Components/Admin/DisplayBooths';
import SurveyDetails from './assets/Components/Admin/SurveyDetails'


function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='reports' element={<DataTable/>}/>
        {/* Admin Access Routes */}
        <Route path='admin-access-only' element={<Admin/>}>
        <Route path='admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='display-users' element={<DisplayUsers/>}/>
        <Route path='display-mandals' element={<DisplayMandals/>}/>
        <Route path="display-villages" element={<DisplayVillages/>}/>
        <Route path="display-wards" element={<DisplayWards/>}/>
        <Route path="display-booths" element={<DisplayBooths/>}/>
        <Route path="total-surveys" element={<SurveyDetails/>}/>
        
        </Route>
      
        <Route path='dashboard' element={<Dashboard/>}>
        

          <Route path='users' element={<Users/>}/>         
          <Route path='allocated' element={<Booths/>}/> 
          
          
        
          <Route path='allocated/boothlist/:id/:name/:mobile' element={<BoothList/>}/> 

          <Route path='page' element={<Page/>}/>
          </Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App;
