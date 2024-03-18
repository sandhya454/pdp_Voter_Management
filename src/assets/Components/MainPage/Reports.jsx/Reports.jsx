import React,{useState,useEffect} from 'react'
import './Reports.scss';
import { FiSearch } from "react-icons/fi";
import * as XLSX from "xlsx";
import { FaFileExport } from 'react-icons/fa';
import TableComponent from './TableComponent';

function Reports() {
  
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSurveyor,setSelectedSurveyor]=useState("")
  const [selectSurveyedOn,setSelectSurveyedOn]=useState("")
  const [selectWard,setSelectWard]=useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectSurveyStatus,setSelectSurveyStatus]= useState("")
  const [dataCount,setDataCount]=useState(0);

  const filterData = () => {
    

    let filteredData = originalData;

    if (selectedGender) {
      filteredData = filteredData.filter(item => item.Gender === selectedGender);
    }
    if (selectedBooth !=="") {
      filteredData = filteredData.filter(item => {return String(item.Booth) === String(selectedBooth)});
    }
    if(selectedAge !==""){
      filteredData=filteredData.filter(item=> {return String(item.Age) === String(selectedAge)});
    }
    if(selectedCaste){
      filteredData=filteredData.filter(item=>item.Caste === selectedCaste);
    }
    if(selectedColor){
      filteredData=filteredData.filter(item=>item.Color === selectedColor);
    }
    if( selectedSurveyor !== ''){
      filteredData=filteredData.filter(item=>{return String(item.Surveyer).trim() ===  String(selectedSurveyor).trim()});
    }
    if( selectSurveyedOn!== ''){
      filteredData=filteredData.filter(item=>{return String(item.Surveyed_on).slice(0,11).trim() ===  String(selectSurveyedOn).slice(0,11).trim()});
    }
    if(selectWard !==""){
      filteredData=filteredData.filter(item=> {return String(item.Wards) === String(selectWard)});
    }
    if(selectSurveyStatus === "completed"){
      filteredData=filteredData.filter(item=>item.Survey==1);
    }else if(selectSurveyStatus === "Pending"){
      filteredData=filteredData.filter(item=>item.Survey==0)
    }
    if(searchTerm){
      filteredData = filteredData.filter(item => {
        const epicMatch = String(item.Epic).toLowerCase().includes(searchTerm.toLowerCase());
        
        const fatherNameMatch = String(item.Father_Name).toLowerCase().includes(searchTerm.toLowerCase());
        const surnameMatch = String(item.Surname).toLowerCase().includes(searchTerm.toLowerCase());
        const houseNumberMatch = String(item.House_Number).toLowerCase().includes(searchTerm.toLowerCase());
        const nameMatch = String(item.Name).toLowerCase().includes(searchTerm.toLowerCase());
    
        console.log(`Item: ${JSON.stringify(item)}, Search Term: ${searchTerm}`);
        console.log(`Matches: Epic - ${epicMatch}, Name - ${nameMatch}, Father Name - ${fatherNameMatch}, Surname - ${surnameMatch}, House Number - ${houseNumberMatch}`);
    
        return epicMatch || nameMatch || fatherNameMatch || surnameMatch || houseNumberMatch;
    });
    
    }
    setDataCount(filteredData.length)
    setData(filteredData);
  }

  const fetchData=async()=>{
    try{
      const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-all-data')
      if(response.ok){
        const data=await response.json()
        const data1=data
        console.log(data,'kkk')
       
        setOriginalData(data1)
        setData(data1)

        
        

      }
      else{
        alert('no data')
      }
    
    }
    catch(error){
      console.error(error,'errro in fetching all data')
    }
    return data
  }

  useEffect(()=>{

    fetchData()

  },[])
  


  useEffect(() => {
     filterData();
   
  }, [selectedGender, selectedBooth, selectedAge, selectedCaste, selectedColor, selectedSurveyor,selectSurveyedOn, selectWard,selectSurveyStatus,searchTerm, originalData]);
  
  const getUniqueValues = (key) => {
    let uniqueValues = [...new Set(data.map((item) => item[key]))];
    if (key === 'Age' || key==="Booth" || key==="Wards") {
      uniqueValues = uniqueValues.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    } else {
      uniqueValues = uniqueValues.sort();
    } 

    if(key === "Surveyed_on"){
      const uniqueDates = [...new Set(uniqueValues.map(value => value))];

      return uniqueDates.map((date)=>(
      <option key={date} value={date}>{date}
      </option>
      ))
    }
    return uniqueValues.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    XLSX.writeFile(workbook, 'filtered_data.xlsx');
  };
  return (
    <>
          <div className='Reports'>  

          <TableComponent data={data}/>

          
                  {/* <div className='Drop-downs'>
                    <div className='mini'>
                        <label htmlFor="gender">Gender:</label><br/>
                          <select name="gender" id="gender" onChange={(e) => setSelectedGender(e.target.value)}>
                          <option value="">Select Gender</option>
                            {
                              getUniqueValues("Gender")
                            }
                          </select>
                    </div>
                    <div className='mini'>
                      <label htmlFor="surveyod_on">Wards:</label><br/>
                      <select name="surveyed_on" id="surveyor" onChange={(e)=>{setSelectWard(e.target.value),console.log(e.target.value,"selected surveyor");}}>
                      <option value="">Select Ward no:</option>
                      {    
                              getUniqueValues("Wards")
                            }                        
                      </select>
                    </div>
                    <div className='mini'>
                      <label htmlFor="Booth">Booth:</label><br/>
                      <select name="Booth" id="Booth" onChange={(e)=>{setSelectedBooth(e.target.value)}}>
                      <option value="">Select Booth:</option>
                     
                           {    
                              getUniqueValues("Booth")
                            }
                      </select>
                    </div>
                    
                    <div className='mini'>
                      <label htmlFor="age">Age:</label><br/>
                      <select name="age" id="age" onChange={(e)=>{setSelectedAge(e.target.value),console.log(e.target.value);}}>
                      <option value="">Select Age</option>
                       
                           {    
                              getUniqueValues("Age")
                            }
                      </select>
                    </div>
                    <div className='mini'>
                      <label htmlFor="caste">Caste:</label><br/>
                      <select name="caste" id="caste" onChange={(e)=>{setSelectedCaste(e.target.value)}}>
                      <option value=""> Select Caste</option>
                      {    
                              getUniqueValues("Caste")
                            }
                      </select>
                    </div>
                    <div className='mini'>
                      <label htmlFor="color">Color:</label><br/>
                      <select name="color" id="color" onChange={(e)=>{setSelectedColor(e.target.value)}}>
                      <option value="">Select Color</option>
                      {    
                              getUniqueValues("Color")
                            }
                        
                      </select>
                    </div> 

                    <div className='mini'>
                      <label htmlFor="surveyor">Surveyor:</label><br/>
                      <select name="surveyor" id="surveyor" onChange={(e)=>{setSelectedSurveyor(e.target.value),console.log(e.target.value,"selected surveyor");}}>
                      <option value="">Select Surevyor by name</option>
                      {    
                              getUniqueValues("Surveyer")
                            }                        
                      </select>
                    </div>  
                    <div className='mini'>
                      <label htmlFor="surveyod_on">Surveyed_on:</label><br/>
                      <select name="surveyed_on" id="surveyor" onChange={(e)=>{setSelectSurveyedOn(e.target.value),console.log(e.target.value,"selected surveyor");}}>
                      <option value="">Select Survey Date</option>
                      {    
                              getUniqueValues("Surveyed_on")
                            }                        
                      </select>
                    </div>
                    
                    <div className='mini'>
                      <label htmlFor="surveyStatus">Status:</label><br/>
                      <select name="surveyStatus" id="surveyor" onChange={(e)=>{setSelectSurveyStatus(e.target.value)}}>                    
                                <option value="">Select Survey Status</option>
                                <option value="completed">Completed</option>
                                <option value="Pending">Incomplete</option>                     
                      </select>
                    </div>
                    
                <div className='Search'>
                  <input type="text"  placeholder='Search here' className='search-bar' onChange={(e) => setSearchTerm(e.target.value)}/>
                  <span className='search-icon'><FiSearch /></span>
                  
                </div>
                
                    <p>Count:{dataCount}</p>
                    <div className='export-btn'>
                      <button onClick={exportToExcel}>Export <span><FaFileExport/></span> </button>
                    </div>
                    
                    
                </div>
               
                <div className='report-table'>
                  <table cellPadding={0}cellSpacing={0}>
                        <thead>
                                            <th>Voter_S_no</th>
                                            <th>Epic</th>
                                            <th>Name</th>
                                            <th>Father_Name</th>
                                            <th>Surname</th>
                                            <th>House_Number</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                             <th>Area</th>
                                             <th>Constituency</th>
                                             <th>Mandal</th>
                                             <th>Village</th>
                                             <th>Pincode</th>
                                             <th>Polling_Station</th>
                                             <th>Booth</th>
                                             <th>Mp</th>
                                             <th>District</th>
                                             <th>Age_grp</th>
                                             <th>Wards</th>
                                            <th>Mobile</th>
                                            <th>Remarks</th>
                                            <th>Problems</th>
                                            <th>Survey</th>
                                            <th>Availability</th>
                                            <th>Location</th>
                                            <th>Caste</th>
                                            <th>Color</th>
                                            <th>Observation</th>
                                            <th>Surveyer</th>
                                            <th>Surveyed_on</th>
                                            <th>created_at</th>
                                            <th>Geo</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>survey_id</th>
                                            <th>survey_date</th>
                          </thead>
                          <tbody>
                          {data.slice(1,1000).map((item, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td> 
                                            <td>{item.Voter_S_no}</td>
                                            <td>{item.Epic}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Father_Name}</td>
                                            <td>{item.Surname}</td>
                                            <td>{item.House_Number}</td>
                                            <td>{item.Age}</td>
                                            <td>{item.Gender}</td>
                                             <td>{item.Area}</td>
                                             <td>{item.Constituency}</td>
                                             <td>{item.Mandal}</td>
                                             <td>{item.Village}</td>
                                             <td>{item.Pincode}</td>
                                             <td>{item.Polling_Station}</td>
                                             <td>{item.Booth}</td>
                                             <td>{item.Mp}</td>
                                             <td>{item.District}</td>
                                             <td>{item.Age_grp}</td>
                                             <td>{item.Wards}</td>
                                            <td>{item.Mobile}</td>
                                            <td>{item.Remarks}</td>
                                            <td>{item.Problems}</td>
                                            <td>{item.Survey}</td>
                                            <td>{item.Availability}</td>
                                            <td>{item.Location}</td>
                                            <td>{item.Caste}</td>
                                            <td>{item.Color}</td>
                                            <td>{item.Observation}</td>
                                            <td>{item.Surveyer}</td>
                                            <td>{item.Surveyed_on}</td>
                                            <td>{item.created_at}</td>
                                            <td>{item.Geo}</td>
                                            <td>{item.Latitude}</td>
                                            <td>{item.Longitude}</td>
                                            <td>{item.survey_id}</td>
                                            <td>{item.survey_date}</td>
                                            
                                          </tr>
                                        ))}
                          </tbody>
                  </table>

                          </div>  */}
            </div> 
    </>
  )
}
export default Reports;
