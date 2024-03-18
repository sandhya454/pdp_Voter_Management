import React, { useEffect, useState } from 'react'

export default function DisplayBooths() {
  const [data,setData]=useState([]);
  const fetchData= async ()=>{
    try{
      const response= await fetch("https://admin-pdp-api.stepnext.com/admin/get-boothss",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response.ok){
        const responseData= await response.json();
        console.log("reponse",responseData);
        setData(responseData)
      }else{
        alert("no")
      }
    }
    catch(error){
      console.error("error while fecthing",error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  const groupByBooths = () => {
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.Booth]) {
            groupedData[item.Booth] = [];
        }
        groupedData[item.Booth].push(item);
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
            <h3>Booths</h3>
            <h3>Total_Booths:{groupByBooths().length}</h3>
          </div>
          <div className='mandal-table'>
            <table cellPadding={0} cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Booth_No</th>
                    <th>Total_Voters</th>
                    <th>Surveyed</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                {data.length>0  &&
                            groupByBooths().map((group, index) => {
                              const total = group.reduce((acc, curr) => acc + curr.count, 0);
                              const survey1Count = getCountBySurvey(group, '1');
                              const surveyEmptyCount = getCountBySurvey(group, '')
                                      return (

                                     <tr key={index}>
                                    <td>{group[0].Booth}</td>
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
