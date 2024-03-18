import React, { useEffect, useState } from 'react'

export default function s() {

  const [data,setData]=useState([]);

  const fetchData= async ()=>{
    try{
      const response= await fetch("https://admin-pdp-api.stepnext.com/admin/get-wards",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response.ok){
        const responseData=await response.json();
        console.log("response",responseData);
        setData(responseData)
      }
    }
    catch(error){
      console.error("error while fecthing",error)
    }
  }


useEffect(()=>{
  fetchData()
},[])
const groupByWard = () => {
  const groupedData = {};
  data.forEach(item => {
      if (!groupedData[item.Wards]) {
          groupedData[item.Wards] = [];
      }
      groupedData[item.Wards].push(item);
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
            <h3>Wards</h3>
            <h3>Total Wards:{groupByWard().length}</h3>
          </div>
          <div className='mandal-table'>
            <table cellSpacing={0} cellPadding={0}>
              <thead>
                <tr>
                  <th>Ward_Number</th>
                  <th>Total_Voters</th>
                  <th>Surveyed</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
              {data.length>0  &&
                            groupByWard().map((group, index) => {
                              const total = group.reduce((acc, curr) => acc + curr.count, 0);
                              const survey1Count = getCountBySurvey(group, '1');
                              const surveyEmptyCount = getCountBySurvey(group, '')
                                      return (

                                      <tr key={index}>
                                    <td>{group[0].Wards}</td>
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
