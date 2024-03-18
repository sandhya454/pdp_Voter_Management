import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 


import "./Dashboard.css";
import Logout from "../../Login/Logout";
import { FaPowerOff } from "react-icons/fa";

 function Dashboard() {
  const navigate = useNavigate();
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [AdminDetails,setAdminDetails]=useState("")
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);


  const handleNavItemClick = (route) => {
    navigate(route);
    setSelectedNavItem(route);
  };
  const getAdminDetails=async()=>{
    try{
      const token=Cookies.get('token')
      console.log(token,'token')
      const response=await fetch('https://admin-pdp-api.stepnext.com/admin/get-admin',{
        method:'POST',       
        headers:{
          'authorization':`Bearer ${token}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({token:token})
      })
      if(response.ok){
        const AdminDetails=await response.json()
        console.log(AdminDetails,'admin')
        setAdminDetails(AdminDetails);

      }

    }
    catch(error){
      console.error(error,'error in fetching')
    }
  }
  useEffect(() => {
   
    navigate("/dashboard/page");
    setSelectedNavItem("/dashboard");
    getAdminDetails()
  },[]);

  const handleProfileClick=()=>{
    setLogoutModalOpen(true);
  }
  const handleCancelLogout = () => {
    setLogoutModalOpen(false);
  };
  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    localStorage.removeItem('filters')
    navigate("/");
  };

    return (

    <div>
      <div>
        <div className="dashboard-main-container">
          <div className="dashboard-nav-items-main-container">
            <h1 className="dashboard-head" onClick={() => handleNavItemClick("/dashboard/page")}>Dashboard</h1>
            <div className="dashboard-nav-items">
              <p className={`nav-item ${selectedNavItem === "/dashboard/users" ? "selected" : ""}`} onClick={() => handleNavItemClick("/dashboard/users")}>Users</p>
              <p className={`nav-item ${selectedNavItem === "/dashboard/allocated" ? "selected" : ""}`} onClick={() => handleNavItemClick("/dashboard/allocated")}>Allocated Booths</p>
              <p className={`nav-item ${selectedNavItem === "/reports" ? "selected" : ""}`} onClick={() => handleNavItemClick("/reports")}>Data</p>
              
            </div>
          </div>
          <div className="line-container">
            <p className="line"></p>
          </div>
          <div className="outlet-container">
            <div className="location-profile-container">
              <div>
              {AdminDetails.constituency && (
        <h3 className="profile-constituency">{AdminDetails.constituency}</h3>
      )}
              </div>
              <div className="profile-container">
                <div className="profile-line-container">
                  <p className="profile-line"></p>
                </div>
                <div onClick={handleProfileClick}>
                  <p className="profile-name">{AdminDetails.name}</p>
                  <p className="profile-mail">{AdminDetails.mail}</p>
                  <span className="picon"><FaPowerOff/></span><span className="ipara">Logout</span>
                </div>
              </div>
            
            </div>
            <Outlet />
          </div>
        </div>
       
      </div>
      <Logout  isOpen={isLogoutModalOpen}
          onCancel={handleCancelLogout}
          onConfirm={handleConfirmLogout}/>
    </div>
  );
}

export default Dashboard;
