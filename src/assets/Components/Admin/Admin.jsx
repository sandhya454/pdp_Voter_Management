import React, { useEffect, useState } from 'react'
import './Admin.css'
import Logo from '../../Images/people_pulse_logo.png'
import { Input,Popover,Popconfirm } from 'antd';
import Cookies from "js-cookie";
import {
   DashboardTwoTone,
   HddTwoTone,
   UsergroupAddOutlined,
   HomeTwoTone,
   LogoutOutlined,
   UserOutlined,
   IdcardTwoTone
   
  } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Admin() {

  const [activeButton,setActiveButton]=useState("");
  const [adminDetails,setAdminDetails]=useState("")
    const navigate=useNavigate()

    const confirm =()=>{
        navigate('/')
    }
    const handleNavigation=(path)=>{
      navigate(path);
      setActiveButton(path)
    }
    const isButtonActive=(paths)=>{
      return activeButton===paths;
    }
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
    useEffect(()=>{
      getAdminDetails()
    },[])
  return (
    <div className='AdminAccessMainCont'>

        <div className='SideBarMainCont'>

            <div className='LogoCont'>
                <img src={Logo}/>
            </div>
            <div className='SideBar'>
                <div className={`SideBarOpt ${isButtonActive("admin-dashboard")?"active":" "}`} onClick={()=>{handleNavigation("admin-dashboard")}}>
                 <DashboardTwoTone />               
                   <div>
                    Dashboard
                   </div>
                </div>
                <div className={`SideBarOpt ${isButtonActive("display-users")?"active":" "}`} onClick={()=>handleNavigation("display-users")}>
                 <UsergroupAddOutlined />
                   <div>
                    users
                   </div>
                </div>
                <div className={`SideBarOpt ${isButtonActive("display-mandals")?"active":" "}`} onClick={()=>{handleNavigation("display-mandals")}}>
                <HddTwoTone />
                   <div>
                    Mandals
                   </div>
                </div>
                <div className={`SideBarOpt ${isButtonActive("display-villages")?"active":" "}`} onClick={()=>{handleNavigation("display-villages")}}>
                <HddTwoTone />
                   <div>
                    Villages
                   </div>
                </div>
                <div className={`SideBarOpt ${isButtonActive("display-wards")?"active":" "}`} onClick={()=>{handleNavigation("display-wards")}}>
                <HomeTwoTone />
                   <div>
                   Wards
                   </div>
                </div>
                <div className= {`SideBarOpt ${isButtonActive("display-booths")?"active":""}` } onClick={()=>{handleNavigation("display-booths")}}>
                 <HddTwoTone />
                   <div>
                    Booths
                   </div>
                </div>
                <div className={`SideBarOpt ${isButtonActive("total-surveys")?"active":""}`} onClick={()=>{handleNavigation("total-surveys")}}>
                 <IdcardTwoTone />
                   <div>
                    Surveys
                   </div>
                </div>
                


            </div>
            
        </div>

        <div className='MainCont'>
            <div className='NavBar'>
                 {/* <Input placeholder="Search here" className='NavSearch'/> */}
                 <h2>{adminDetails.constituency}</h2>
                 <div className='UserLogout'>

                
                <Popover content={adminDetails.name} title='admin'>
                    <UserOutlined style={{ fontSize: '30px' }} className='UserIcon' />
                 </Popover>
                 <Popconfirm
                    title="Logout"
                    description="Are you sure to Logout?"
                    onConfirm={confirm}
                   
                    okText="Yes"
                    cancelText="No"
                >

                 <LogoutOutlined style={{fontSize:'30px'}} className='LogoutIcon'/>
                 </Popconfirm>
                 </div>



            </div>
            <div className='HeroCont'>
            <Outlet/>
            </div>
            <div className='FooterCont'>

            </div>

        </div>

    </div>
  )
}

export default Admin