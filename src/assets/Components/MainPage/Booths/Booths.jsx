import React, { useEffect, useState } from 'react';
import '../Booths/Booths.scss';
import { useNavigate } from 'react-router-dom';

export default function Booths() {
  const navigate=useNavigate()
  const [booth,setBooth]=useState([])
  const [boothCount,setBoothCount]=useState([])

  const fetchData = async () => {
    try {
      const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-users',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
          
      });
      console.log('API Response:', response); 
      if(response.ok){
        const responseData=await response.json()
        console.log(responseData,'response');
        setBooth(responseData  )       
      }
      else{
        alert('no')
      }   
       
    } catch (error) {
      console.error('Error fetching data:', error);
    }  
  };



  const getBooths = async () => {
    try {
      const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-allocated-booths',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        }
          
      });
      console.log('API Response:', response); 
      if(response.ok){
        const responseData=await response.json()
        console.log(responseData,'ALLOCATED111');
        setBoothCount(responseData  )       
      }
      else{
        alert('no')
      }   
       
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData()
    getBooths()
  },[]);

  const boothList=(id,name,mobile)=>{
    navigate(`boothlist/${id}/${name}/${mobile}`)
  }
  return (
    <>
          <div className='constituency'>
              <h2>Constituency</h2>
              <div className='allocated-booths'>
                  {booth.map((i)=>{
                   return(
                        <>
                        <div className='cards'>
                        <div className='blue'></div>
                        <div className='date'>{i.date}</div>
                        <div className='username'>{i.Name}</div>
                        <div className='booths'><span>Booths</span><span className='num'>{boothCount.filter((booth)=>booth.Surveyer==i.username).length}</span></div>
                        <div className='mobileNumber'><span>Mobile Number</span><span className='cellNum'>{i.mobile_number}</span></div>
                        <button onClick={()=>{boothList(i.user_id,i.Name,i.username)}}>+Allocate</button>
                        </div>
                        </>
                      )
                    
                  })}
              </div>
          </div>
    </>
  )
}
