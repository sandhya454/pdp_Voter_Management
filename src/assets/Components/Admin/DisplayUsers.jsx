import React, { useEffect, useState } from 'react';
import './CSS/DisplayUsers.css'

export default function DisplayUsers() {

  const [data,setData]=useState();
  const [loading,setLoading]=useState(true)

  const fetchData= async()=>{
    try{
      const response= await fetch("https://admin-pdp-api.stepnext.com/admin/get-users",{
        method:"GET",
        headers:{
          'Content-Type':"application/json"
        }
      })
      console.log(response,'res')
      if(response.ok){
      
        const responseData=await response.json();
        console.log(responseData,'response');
        setData(responseData  )  
      }
      else{
        alert('no')
      }
    }catch(error){
      console.error('Error fetching data:', error);
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
          fetchData();
  },[])
  return (
   <>
            
        <div className='Users-Display'>
            <div className='user-details'>
                <h3>Users Details</h3>
                  <h3>Total Users:{data && data.length}</h3>
            </div>

            <div className='user-table'>
              <table cellSpacing={0} cellPadding={10} >
                <thead>
                <tr>
                      <th>SN.NO</th>
                      <th>Name</th>
                      <th>User_Name</th>
                      <th>Password</th>
                      <th>Mobile_Number</th>
                      
                    </tr>
                </thead>
                   <tbody>
                      {loading ? (<p>Loading</p>):
                    ( Array.length>0  && Array.isArray(data)?
                    data.map((i)=>{
                      return(
                        <>
                        <tr key={i}>
                          <td>{i.user_id}</td>
                          <td>{i.Name}</td>
                          <td>{i.username}</td>
                          <td>{i.password}</td>
                          <td>{i.mobile_number}</td>
                        </tr>
                        </>
                      )
                    }):<p>not getting</p>  
                    )}             
                      </tbody>
              </table>
            </div>

        </div>
   </>
  )
}
