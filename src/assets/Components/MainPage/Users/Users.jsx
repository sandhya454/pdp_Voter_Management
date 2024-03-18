import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
// import '../Users/Users.scss';
import '../Users/User.scss';
// import ToggleSwitch from '../Users/ToggleSwitch.jsx';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';




export default function Users() {
  const [showUserList,setShowUserList]=useState(true);
  const [updateTable, setUpdateTable] = useState(false);
  const displayUser=()=>{
        setShowUserList(true)
  }
  const toggleView = () => {
    setShowUserList(false);
  };
  const handleUserCreated = () => {
    setUpdateTable(true);
  };

  useEffect(() => {
    if (updateTable) {
      fetchData();
      setUpdateTable(false);
    }
  }, [updateTable]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData, 'response');
      } else {
        alert('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  return (

    <>    
        <div className='Users'>
          <div className='user-list'>
            <div className='heading' onClick={displayUser} >Users</div>
            <button className='btn' onClick={toggleView}>+create user</button>
          </div>
          {showUserList ? <UserList fetchData={fetchData}  />:<CreateUserForm onUserCreated={handleUserCreated} displayUser={displayUser}/>}
        </div>
    </>
  )
}
const UserList=()=>{
  const [data, setData] = useState([]);
  const [status,setStatus]=useState(false)

  
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
          setData(responseData  )       
        }
        else{
          alert('no')
        }   
         
      } catch (error) {
        console.error('Error fetching data:', error);
      }
 
};

useEffect(()=>{
  fetchData();
},[])
  const updateStatus=async (Status,id)=>{

      try{
        var mani=confirm("are you sure?")
           if(mani==true){

        let status="ACTIVE"
        if(Status==false){

          status="DEACTIVE"


        }

        

          const response =await fetch("https://admin-pdp-api.stepnext.com/admin/user-status",{
            method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({status,id})
          }
          )
          console.log(response,"status");
          if(response.ok){
            
            fetchData()
          }else{
            alert("no")
          }

      }
      
    
    }  catch(error){
        console.error("error",error);
      }
         
  }
          return(
            <>
              <div className='user-table'>
              <table cellSpacing={0} cellPadding={0}>
                <thead>
                  <tr>
                    
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Status</th>
                  
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(data)?
                data.map((i)=>{
                  return(
                    <>
                    <tr key={i.user_id}>
                     
                      <td>{i.username}</td>
                      <td>{i.password}</td>
                      <td>{i.Name}</td>
                      <td>{i.mobile_number}</td>
                      <td>{i.email}</td>
                      <td>{i.Age}</td>
                      <td>{i.Gender}</td>
                      <td className='icon' ><Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      value={(i.Status==="ACTIVE")?true:false} onChange={(value)=>{updateStatus(value,i.user_id)}}
    /></td>
                      
                    </tr></>
                  )
                }):<p>not getting</p>}
                  
                </tbody>
              </table>
          </div>
            </>
          )
};

const CreateUserForm=({onUserCreated,displayUser})=>{
  const navigate=useNavigate()
  const [username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [Name,setName]=useState('');
  const [mobile_number,setMobileNumber]=useState('');
  const [email,setEmail]=useState(''); 
  const [Age,setAge]=useState('');
  const [Gender,setGender]=useState('');
  const handleSubmit=async (e)=>{
        e.preventDefault();
        
        try{
          const response=await axios.post("https://admin-pdp-api.stepnext.com/admin/create-user",{username,password,Name,mobile_number,email,Age,Gender})
          if(response.status==201){
            onUserCreated();
            displayUser();
            // navigate("/dashboard/page")
          }else{
            console.error('Failed to create user');
          }
        }catch (error) {
          console.error('Error creating user:', error);
        }      
       
  }

  return(
    <>
        <div className='user-form'>      
            <form onSubmit={handleSubmit}>
              <div className='details'>
                <div className='elements'>
                  <label htmlFor="username">User Name:</label><br/>
                  <input type="text" id="username" name="username" value={username} placeholder='enter here' className='info' onChange={(e)=>setUserName(e.target.value)} /><br />
                </div>
                  <div className='elements'>
                  <label htmlFor="name">Password:</label><br/>
                  <input type="password" id="password" name="password" value={password} placeholder='enter here' className='info' onChange={(e)=>setPassword(e.target.value)} /><br />
                  </div>
                  <div className='elements'>
                  <label htmlFor="name">Name:</label><br/>
                  <input type="text" id="name" name="name"  value={Name} placeholder='enter here' className='info' onChange={(e)=>setName(e.target.value)}/><br />
                  </div>
                  <div className='elements'>
                  <label htmlFor="name">Mobile Number:</label><br/>
                  <input type="text" id="mobilenumber" name="mobilenumber" value={mobile_number} placeholder='enter here' className='info' onChange={(e)=>setMobileNumber(e.target.value)} /><br />
                  </div> 
                  <div className='elements'>                                
                  <label htmlFor="email">Email:</label><br/>
                  <input type="email" id="email" name="email" placeholder='enter here' value={email} className='info' onChange={(e)=>setEmail(e.target.value)}/><br />  
                  </div> 
                  <div className='elements'>
                  <label htmlFor="name">Age:</label><br/>
                  <input type="number" id="age" name="age" placeholder='enter here' value={Age}  className='info' onChange={(e)=>setAge(e.target.value)}/><br />
                  </div>
                  <div className='elements'>
                  <label htmlFor="name">Gender:</label><br/>
                  <input type="text" id="gender" name="gender" placeholder='enter here' value={Gender} className='info' onChange={(e)=>setGender(e.target.value)}/><br />
                  </div><br/>                 
                  </div>
                  <button className='submit-btn' type='submit'>Submit</button>
                                                     
      </form>
    </div>
    </>
  )
}
