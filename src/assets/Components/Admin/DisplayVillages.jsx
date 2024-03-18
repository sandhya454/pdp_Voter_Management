import React, { useEffect, useState } from 'react'


export default function DisplayVillages() {
  const [data,setData]=useState([]);

  const fetchData=async ()=>{
    try{
      const response= await fetch("https://admin-pdp-api.stepnext.com/admin/get-villages",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response.ok){
        const responseData= await response.json();
        console.log(responseData,"response");
        setData(responseData);
      }
      else{
        alert("no")
      }
    }
    catch(error){
      console.error("Error in fetching data:",error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  const groupByVillage = () => {
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.Village]) {
            groupedData[item.Village] = [];
        }
        groupedData[item.Village].push(item);
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
                  <h3>Villages</h3>
                  <h3>Total Villages:{groupByVillage().length}</h3>
                </div>
                <div className='mandal-table'>
                  <table cellPadding={0} cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>Village_Name</th>
                        <th>Total_Voters</th>
                        <th>Surveyed</th>
                        <th>Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.length>0  &&
                            groupByVillage().map((group, index) => {
                              const total = group.reduce((acc, curr) => acc + curr.count, 0);
                              const survey1Count = getCountBySurvey(group, '1');
                              const surveyEmptyCount = getCountBySurvey(group, '')
                                      return (

                                      <tr key={index}>
                                    <td>{group[0].Village}</td>
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
