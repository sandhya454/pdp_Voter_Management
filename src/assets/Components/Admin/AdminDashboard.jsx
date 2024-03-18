import React, { useEffect, useState } from 'react';
import './CSS/AdminDashboard.css';

export default function AdminDashboard() {
        const [data,setData]=useState([]);
        

        const fetchData= async ()=>{
          try{
            const response = await fetch("https://admin-pdp-api.stepnext.com/admin/get-countss",{
              method:"GET",
              headers:{
                "Content-Type":"application/json"
              }
            })

            if(response.ok){
              const responseData= await response.json();
              console.log("response",responseData);
              setData(responseData)
            }
          }
          catch(error){
            console.error("error while fetching",error)
          }
        }
       
        useEffect(()=>{
          fetchData()
         
        },[])
  return (
   <>
        <div className='admin-dashboard'>
          <h2>Peddapuram Constituency</h2>
          <div className='details'>
                <div className='box voter'>
                  <h4>Total voters<br/>{data.voters}</h4>
                  
                </div>
                <div className='box mandal'>
                  <h4>Mandals<br/>{data.mandals}</h4>
                 
                </div>
                <div className='box village'>
                  <h4>Villages<br/>{data.villages}</h4>
                  
                </div>
                <div className='box wards'>
                  <h4>Wards<br/>{data.wards}</h4>
                  
                </div>
                <div className='box booths1'>
                  <h4>Booths <br/>{data.booths}</h4>                
                </div>
          </div>
           
        </div>
   </>
  )
}
