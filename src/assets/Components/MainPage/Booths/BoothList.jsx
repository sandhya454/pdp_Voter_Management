import React ,{useEffect, useState}from 'react';
import { FaTrash} from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import '../Booths/BoothList.scss';
import { useParams } from 'react-router-dom';
export default function BoothList() {
  const params=useParams();
  const [showBoothList,setShowBoothList]=useState(true);
  const [boothVisible,setBoothVisible]=useState(true);
  const [buttonVisible,setButtonVisible]=useState(false)
  const [booth,setBooths]=useState([])
  const [totalBooths,setTotalBooths]=useState([])
  const [selectedBooth,setSelectedBooth]=useState(null)
  const createBoothForm=()=>{
    setShowBoothList(!showBoothList)
    setBoothVisible(false);
    setButtonVisible(true)
  } 
const booths=()=>{
  setShowBoothList(true)
  getAllocateBooths()

  setButtonVisible(false)
  setBoothVisible(true)
}
const getAllocateBooths = async () => {
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
      console.log(responseData,'ALLOCAtED');
      setBooths(responseData  )       
    }
    else{
      alert('no')
    }   
     
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getBooths=async()=>{
  try {
    const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-booths');
    console.log('API Response:', response); 
    if(response.ok){
      const responseData=await response.json()
      console.log(responseData,'ALLOCAtED');
      setTotalBooths(responseData) 
    }
    else{
      alert('no')
    }   
     
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
}

const createAllocateBooth=async()=>{
  // booths()
  
    try {
      const booth_no=selectedBooth
      const data=totalBooths.filter((booth)=>booth.Booth==selectedBooth)[0]   
      const ward=data.Wards
      const mandal=data.Mandal
      const area = data.Area
      const constituency=data.Constituency
      const village=data.Village
      const user_id=params.id
      const name=params.name
      const mobile_number=params.mobile
      const Surveyer=params.mobile
      const crBooth={booth_no,user_id,name,mobile_number,Surveyer,village,mandal,area,constituency,ward}
    
      const response = await fetch('https://admin-pdp-api.stepnext.com/admin/create-allocated-booth',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(crBooth)
          
      });
      console.log('API Response:', response); 
      if(response.ok){
        const responseData=await response.json()             
        // booths()  
      }
      else{
        alert('no')
      }   
       
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}
useEffect(()=>{
  getBooths()
  getAllocateBooths()
  
},[])
const handleSelectedBooths=(booth)=>{
  setSelectedBooth(booth)

}
  return (
    <>
        <div className='booth-list'>
              <h2 onClick={booths}>Constituency</h2>             
              <div className='booths'>
              {showBoothList?<ShowBooths booth={booth} id={params.mobile}/>:<CreateBooth booths={totalBooths} handleSelectedBooths={handleSelectedBooths}/>}              
              {boothVisible && <div className='additional-booth' onClick={createBoothForm}>
                      <span ><CiCirclePlus /></span>
                          <p>Create Booth</p>
                    </div>}</div>
                  <div className="form">
                          {buttonVisible &&  <button className='btn' onClick={()=>{createAllocateBooth(),booths()}}>Save</button>}
                  </div>                    
              </div>       
    </>
  )
}
const ShowBooths=({booth,id})=>{
  console.log("Booth data:", booth);
  console.log("User ID:", id);
  return(
    <>                
                    {booth.filter((b)=>b.Surveyer==id).map((i)=>{
                      return(
                        <>
                          <div key={i.id} className='list'>                            
                                  <h3>{i.Booth}</h3>
                                  <span><p className='icon'><FaTrash/></p></span>
                                  <p>Ward:{i.Wards}</p>                                  
                          </div>
                        </>
                      )
                    })}                   
    </>
  )
};

const CreateBooth=({ booths,handleSelectedBooths })=>{
      return(
        <>
        <form >         
            <select name="booths" id="" onChange={(e)=>{handleSelectedBooths(e.target.value)}}>                  
                  {
                    booths.map((booth)=>(
                      <option value={booth.Booth} >{booth.Booth}</option>
                    ))
                  }
            </select>
        </form> 
       
        </>
      )
};
