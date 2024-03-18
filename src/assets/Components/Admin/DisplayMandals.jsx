import React from 'react';
import './CSS/DisplayMandals.css';
import { useEffect,useState } from 'react';


export default function DisplayMandals() {

  const [data,setData]=useState([]);

  const fetchData= async()=>{
    try{
      const response= await fetch("https://admin-pdp-api.stepnext.com/admin/get-mandals",{
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
  }
  useEffect(()=>{
          fetchData();
  },[])


  const groupByMandal = () => {
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.Mandal]) {
            groupedData[item.Mandal] = [];
        }
        groupedData[item.Mandal].push(item);
    });
    return Object.values(groupedData);
}

// Function to get count by Survey type
const getCountBySurvey = (data, surveyType) => {
    return data.find(item => item.Survey === surveyType)?.count || 0;
}
 
  return (
    <>
          <div className='Mandals'>
            <div className='Mandals-Details'>
              <h3>Mandals</h3>
              <h3>Total Mandals:{groupByMandal().length}</h3>
            </div>
            <div className='mandal-table' >
              <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Mandal_Name</th>
                    <th>Total_Voters</th>
                    <th>Surveyed</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>

                {data.length>0  &&
                 groupByMandal().map((group, index) => {
                  const total = group.reduce((acc, curr) => acc + curr.count, 0);
                  const survey1Count = getCountBySurvey(group, '1');
                  const surveyEmptyCount = getCountBySurvey(group, '')
                  return (

                      <tr key={index}>
                <td>{group[0].Mandal}</td>
                <td>{total}</td>
                <td>{survey1Count}</td>
                <td>{surveyEmptyCount}</td>
                    </tr>
                  )
                })
              }
                       
                </tbody>
              </table>
            </div>
          </div>

    </>
  )
}
