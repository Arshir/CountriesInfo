import { useState,useEffect } from "react";
import countryService from "./services/country"
import ShowMessage from "./ShowMessage"
import DisplayList from "./DisplayList"
import ShowDetail from "./Detail";
import allWorldFlags from "../src/images/all-flags-world-official.jpg"
import DisplayPageLinks from "./DisplayPageLinks";

const App=()=>{

 //const [country,setCountry]=useState('');
 let country ={}
 const [countries,setCountries]= useState([])
 //const [message,setMessage]= useState(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
 //No  matches. Specify another filter</div>)
 const [pageNo,setPageNo]= useState(1)
 const [search,setSearch]= useState('')
let message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
No  matches. Specify another filter</div>
  

  useEffect( ()=>{
    console.log("calling useEffect")
    const loadData= async ()=>{ 
      console.log('data loading')
      //let isToExecute=true;
      await countryService.getAll().then(res=>{
        console.log('countries data',res);
       setCountries(res)
      }).catch(error=>{
        setCountries([])
       // setMessage(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
        //  The countries data could not be retrieved. {error}</div>)
        message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
         The countries data could not be retrieved. {error}</div>
  }) 
    //return ()=>isToExecute==false;
 }
   loadData();
  } ,[]);



  let   countryNames =[],  pageSize=10, pages =[], countryNamesParts=[]
  if(search)
  {
    console.log('type search term', search)
    const filterCountries = countries.filter(f=>f["name"]["common"].toLowerCase().includes(search.toLowerCase()))
    let count= filterCountries.length
     console.log('filtered countries',filterCountries)
   
    if (count>500)
   
      message=<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
      Too many matches . Please specify another filter</div>
    else if(count>1)
      {
       
         countryNames = filterCountries.map(c=> c.name.common)
         console.log('Country names',countryNames)
         message =''
         let navlength = Math.ceil(countryNames.length/pageSize)
         pages =  [...Array(navlength).keys()].map(i => i + 1);

         countryNamesParts=pages.map(p=> countryNames.slice(p*pageSize -pageSize,p*pageSize))
       

         console.log('country parts',countryNamesParts)

      }
       

    else if(count===1)
     {
       console.log('filtered country',filterCountries[0])
       
        
                  country.name= filterCountries[0].name.common;
                  country.capital= filterCountries[0].capital;
                  country.area= filterCountries[0].area;
                  country.languages= filterCountries[0].languages;
                   country.flag=filterCountries[0].flags.png;

                   console.log('country',country);
                   message='';
         
     }
        
  }
      
      



     return (
        <div align='Center' width='20%'>
         <div><img src={allWorldFlags} alt='world countries flag'/></div> 
          
         Type Full or Part of Name of Country:<input 
 name='search' value={search} onChange={(event)=>{ event.preventDefault(); setSearch(event.target.value)}}/>
          <ShowMessage message={message} />
          <DisplayList list={countryNamesParts[pageNo-1]} showDetail={setSearch}  />
          <DisplayPageLinks pageList={pages} showPage={setPageNo}  />
          <ShowDetail country={country} />
        </div>
     )
      


}
export default App;
