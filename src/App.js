import { useState,useEffect } from "react";
import countryService from "./services/country"
import ShowMessage from "./ShowMessage"
import DisplayList from "./DisplayList"
import ShowDetail from "./Detail";

const App=()=>{

 //const [country,setCountry]=useState('');
 let country ={}
 const [countries,setCountries]= useState([])
 //const [message,setMessage]= useState(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
 //No  matches. Specify another filter</div>)
 const [search,setSearch]= useState('')
let message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
No  matches. Specify another filter</div>
  

  useEffect( ()=>{
    
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


  let   countryNames =[]
  if(search)
  {
    console.log('type search term', search)
    const filterCountries = countries.filter(f=>f["name"]["common"].toLowerCase().includes(search.toLowerCase()))
    let count= filterCountries.length
     console.log('filtered countries',filterCountries)
   
    if (count>10)
   
      message=<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
      Too many matches . Please specify another filter</div>
    else if(count>1)
      {
         countryNames = filterCountries.map(c=> c.name.common)
         console.log('Country names',countryNames)
         message =''
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
        <div>
          <input name='search' value={search} onChange={(event)=>{ event.preventDefault(); setSearch(event.target.value)}}/>
          <ShowMessage message={message} />
          <DisplayList list={countryNames} showDetail={setSearch}  />
          <ShowDetail country={country} />
        </div>
     )
      


}
export default App;
