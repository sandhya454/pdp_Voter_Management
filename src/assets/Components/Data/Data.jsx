import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space,Select } from 'antd';
import { SearchOutlined,DownloadOutlined } from '@ant-design/icons';

import Cookies from 'js-cookie'
import CountUp from 'react-countup';
import './Data.css'
import * as XLSX from 'xlsx';

const DataTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [originalData,setOriginalData]=useState([]);
  const [initialCount,setInitialCount]=useState(0);
  const [RecordsCount,setRecordsCount]=useState(0);
  const [filteredData,setFilteredData]=useState([])

  const [columns1,setColumn]=useState('House_Number')
    
   
  const [details,setDetails]=useState([])
  const [Mandals,setMandals]=useState([])
  const [Villages,setVillages]=useState([])
  const [Wards,setWards]=useState([])
  const [Booths,setBooths]=useState([])
  const [Areas,setAreas]=useState([]) 
  const [Filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem('filters');
    return storedFilters ? JSON.parse(storedFilters) : { Booth:1 };
  });
  
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(Filters));

    setLoading(true);

    setLoading(true)
    

  }, [Filters]);
  

  const [Mandal,setMandal]=useState(null)
  const [Village,setVillage]=useState(null)
  const [Ward,setWard]=useState(null)
  const [Booth,setBooth]=useState(null)
  const [Area,setArea]=useState(null) 


  const [VoterList,setVoterList]=useState([])
  const [isloading,setIsloading]=useState(false);

  const [SearchTerms,setSearchTerms]=useState(null)
 
  const getConstituencyDetails=async()=>{
 
 
  try{
      const response = await fetch('https://api-pdp.stepnext.com/constituency-details')
      if(response.ok){

      
      const data=await response.json()
      setDetails(data)
     
     
     
      const uniqueMandals = [...new Set(data.map(obj => obj.Mandal))];
      const convertedListMandals = uniqueMandals.map(mandal => ({
          value: mandal,
          label: mandal,
        }))
      setMandals(convertedListMandals)
      
      }

  }
  catch(error){
      console.error(error,'error in fetch')
  }

}
const getVillages=async()=>{
  try{
    let currentData=details
    if(Mandal!=null){
   
       currentData=details.filter((dat)=>dat.Mandal===Mandal)
    }
     
      const uniqueVillages = [...new Set(currentData.map(obj => obj.Village))];
     
      const convertedListVillages = uniqueVillages.map(village => ({
          value: village,
          label: village,
        }))
        
        setVillages(convertedListVillages)

  }
  catch(error){
      console.error(error,'error in get village')
  }

}
const getWards=async()=>{
  try{
   let currentData=details
   if(Village!=null){
     currentData=details.filter((dat)=>dat.Village===Village)
   }
     
      const uniqueWards = [...new Set(currentData.map(obj => obj.Wards))];
      const convertedListWards = uniqueWards.map(ward => ({
          value: ward,
          label: ward,
        }))
        
        setWards(convertedListWards)

  }
  catch(error){
      console.error(error,'error in get Wards')
  }

}
const getBooths=async()=>{
  try{
    let currentData=details
    if( Ward!=null){
      currentData=details.filter((dat)=>dat.Wards===Ward)
    }
   
    
     
      const uniqueBooths = [...new Set(currentData.map(obj => obj.Booth))];
    
      const convertedListBooths = uniqueBooths.map(booth => ({
          value: booth,
          label: booth,
        }))
        
        setBooths(convertedListBooths)

  }
  catch(error){
      console.error(error,'error in get Booths')
  }

}
const getAreas=async()=>{
  try{
    let currentData=details

      if(Booth!=null){
   
        currentData=details.filter((dat)=>dat.Booth===Booth)
      }
     
      const uniqueAreas = [...new Set(currentData.map(obj => obj.Area))];

    
      const convertedListAreas = uniqueAreas.map(area => ({
          value: area,
          label: area,
        }))
        
        setAreas(convertedListAreas)

  }
  catch(error){
      console.error(error,'error in get village')
  }

}
useEffect(()=>{
  getWards()
  getAreas()
  getBooths()
  getVillages()
 
},[details])
useEffect(()=>{
  getVillages()
},[Mandal])

useEffect(()=>{
  getWards()
},[Village])

useEffect(()=>{
  getBooths()
},[Ward])

useEffect(()=>{
  getAreas()
},[Booth])

useEffect(()=>{
  getAreas()
},[details])

const handleMandal=async(value)=>{
  setArea(null)
  setBooth(null)
  setWard(null)
  setVillage(null)
  setMandal(value)
 
}
const handleVillage=async(value)=>{
  setArea(null)
  setBooth(null)
  setWard(null)
 
  setVillage(value)
  
}
const handleWards=async(value)=>{
  setArea(null)
  setBooth(null)
 
  setVillage(null)
  setMandal(null)
  setWard(value)
}
const hadleBooths=async(value)=>{
  setArea(null)
  
 
  setVillage(null)
  setMandal(null)
  setBooth(value)
  
}
const handleAreas=async(value)=>{
 
  
  setVillage(null)
  setMandal(null)
  setArea(value)

}

useEffect(()=>{
  getConstituencyDetails()

},[])
const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};
const onCancel = async() => {
  // const defaultFilters={Wards:49}
  setFilters({Booth:1});
  // localStorage.setItem('filters', JSON.stringify(defaultFilters));
  Cookies.remove('Filters')
  setBooth(null)
  setArea(null)
  setMandal(null)
  setWard(null)
  setVillage(null)
  setOpen(false);

  await fetchData()
  

  handleReset()
  handleSearch([],()=>{},'Name')

};

const getCount=async()=>{
  try{
    const response = await fetch('https://admin-pdp-api.stepnext.com/admin/get-counts')
    const count = await response.json()
    console.log(count,'k')
    setInitialCount(count)
    

  }
  catch(error){
    console.error('error in fetching count',error)
  }

}
useEffect(()=>{
  getCount()
},[])

  const fetchData = async () => {
    try {
      
      const response = await fetch(`https://admin-pdp-api.stepnext.com/admin/get-all-data/${Object.keys(Filters)[0]}/${Filters[Object.keys(Filters)[0]]}`);
      const result = await response.json();
      setData(result);
      setOriginalData(result)
      setLoading(false);
     
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData()
    setIsloading(true)
  },[Filters])

  const applyFilters=async()=>{
    console.log(Booth,Area,Ward,Village,Mandal,'hello')
   
    try{
      if(Area!=null){
        setFilters({Area:Area})
      }
      else if(Booth != null){
        setFilters({Booth:Booth})
      }
      else if(Ward!=null ){
        setFilters({Wards:Ward})

      }
      else if(Village!=null){
        setFilters({Village:Village})
      }
      else if(Mandal!=null ){
        setFilters({Mandal:Mandal})
      }
      Cookies.set(Filters,'Filters')

    }
    catch(error){
      console.error(error,'error in applying filters')
    }
  }
  useEffect(()=>{
    applyFilters()

  },[Booth,Area,Ward,Mandal,Village])


  const exportToExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };

  const handleExport = () => {
    // Use filteredData if available, otherwise use the original data

    const exportData = filteredData.length > 0 ? filteredData : originalData;


    exportToExcel(exportData, 'filtered_table_data.xlsx');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() =>{ handleReset(),clearFilters(),setSelectedKeys([]),handleSearch(selectedKeys,confirm,dataIndex)}} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

     
  
     
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
   
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    
  };

  const handleReset = () => {
   
    
    setSearchText('');
    setRecordsCount(0)
  
    setSearchedColumn(null);
    
    setData(originalData)
    setFilteredData(originalData)

  };

  

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    console.log(filters,'kkk')
    const filteredData = data.filter((record) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key];
      return record[key].toString().toLowerCase().includes(filterValue[0].toLowerCase());
    })
  )
    

    

   
    setRecordsCount(filteredData.length)

    setFilteredData(filteredData)
    setData(filteredData)


   
  };

  const columns = data.length > 0 ? Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
    ...getColumnSearchProps(key),
  })) : [];

 

  return (
    <>
      <div style={{ marginBottom: 16 }} className='CountsDiv'>
        <strong style={{color:'red'}}>Actual Count:<CountUp end={initialCount} /></strong> 
        <br />
        <strong>Filtered Count:<CountUp end={data.length} /></strong> 
      </div>
      <div className='SelectedDiv'>
        <div>Selected {
        `${Object.keys(Filters)[0]}:${Filters[Object.keys(Filters)[0]]}`
}
        </div>
        <div>
          <strong style={{color:'green'}}>Records-match:<CountUp end={RecordsCount} /></strong>
        </div>
        
        <Button onClick={onCancel}>
          Reset
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport} >
            Export
          </Button>
        
        
        </div>
      <div style={{ marginBottom: 16 }} className='FiltersDiv'>


        <div className='MandalVillageCont'>
      <Select className='select'
        
        placeholder={'Select mandal'}
        showSearch
        optionFilterProp="children"
       filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
       filterSort={(optionA, optionB) =>
         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
       }
       options={Mandals}
       onChange={handleMandal}
        value={Mandal}/>
       <Select className='select'
        placeholder={'Select village'}
        showSearch
        optionFilterProp="children"
       filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
       filterSort={(optionA, optionB) =>
         (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
       }
         options={Villages}
          onChange={handleVillage}
           value={Village}/>
           </div>

           <div className='WardsBoothCont'>
       <Select className='select'
        placeholder={'Select Ward'}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => (option?.value.toString() ?? '').includes(input)}
       filterSort={(optionA, optionB) => {
         const valueA = optionA?.value || 0;
         const valueB = optionB?.value || 0;
         return valueA - valueB;
       }}

       
       options={Wards}
       onChange={handleWards}
       value={Ward}/>
       <Select className='select'
       placeholder={'Select Booth'}
       showSearch
       optionFilterProp="children"
       filterOption={(input, option) => (option?.value.toString() ?? '').includes(input)}
      filterSort={(optionA, optionB) => {
        const valueA = optionA?.value || 0;
        const valueB = optionB?.value || 0;
        return valueA - valueB;
      }}

      
       
       options={Booths} 
       onChange={hadleBooths} 
       value={Booth}/>
      

       </div>
      
        
       
      </div>

      <Table
       className='MainContTable'

        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        onChange={handleChange}
      />
    </>
  );
};

export default DataTable;
