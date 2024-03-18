import React, { useEffect ,useState} from "react";
import {useNavigate} from 'react-router-dom';

import './page.css';

function Page(){
    const navigate=useNavigate();
    const [userData,setUserData]=useState([]);
    const [allBooths,setAllBooths]=useState([]);
    const [allocateBooth,setAllocateBooth]=useState([]);
    const getUserDetails=async()=>{
        try{
              const data= await fetch("https://admin-pdp-api.stepnext.com/admin/get-users",{
                method:"GET",
                headers:{
                  "Content-Type":"application/json"}
              })
              if(data.ok){
                const finalData= await data.json();
                console.log("final data",data);
                  setUserData(finalData)
              }else{
                alert("NO")
              }
        }
        catch(error){
              console.error("error in fetching data",error);
        }
      }     
      const getTotalBooths=async()=>{
        try{
            const totalBooths=await fetch("https://admin-pdp-api.stepnext.com/admin/get-booths",{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            })
            if(totalBooths.ok){
                const booths=await totalBooths.json();
                console.log("booths",booths);
                setAllBooths(booths)

            }else{
                alert("NO");
            }
        }
        catch(error){
            console.error("error whilefetching",error);
        }
      }

      const getAllocateBooth=async ()=>{
        try{
                const allocate= await fetch("https://admin-pdp-api.stepnext.com/admin/get-allocated-booth",{
                    method:"GET",
                    headers:{"Content-Type":"application/json"}
                });
                if(allocate.ok){
                    const allocateCount= await allocate.json();
                    console.log("allocatecount",allocateCount);
                    setAllocateBooth(allocateCount);

                }

        }catch(error){
            console.error("error while fetching",error);
        }
      }
      useEffect(()=>{
        getUserDetails()
        getTotalBooths();
        getAllocateBooth()
      },[])

    return(
        <div>
            <div>
                <div className="dashboard-details-container">
                    
                    <div className="white-back-ground-container">
                        <div className="boths-and-users-container">
                            <div className="booths-containers">
                                <p className="total">Total Booths<br/> {allBooths.length}</p>
                            </div>
                            <div className="booths-containers">
                                <p onClick={()=>{navigate('/dashboard/users')}} className="users">Users <br/>{userData.length}</p>
                            </div>

                            <div className="booths-containers">
                                <p className="allocated">Allocated <br/> {allocateBooth.length}</p>
                            </div>

                            <div className="booths-containers">
                                <p className="unallocated">Un Allocated <br/>{ (allBooths.length)-(allocateBooth.length)} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;