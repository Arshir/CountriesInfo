import { useState,useEffect } from "react";
import countryService from "./services/country"
import ShowMessage from "./ShowMessage"
import DisplayList from "./DisplayList"
import ShowDetail from "./Detail";
import allWorldFlags from "../src/images/all-flags-world-official.jpg"
import DisplayPageLinks from "./DisplayPageLinks";
import weatherService from "./services/weather";

const App=()=>{

 //const [country,setCountry]=useState('');
//let country ={}
 const [countries,setCountries]= useState([])
 //const [message,setMessage]= useState(<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
 //No  matches. Specify another filter</div>)
 const [pageNo,setPageNo]= useState(1)
 const [search,setSearch]= useState('')
 const [weather,setWeather]=useState(null)
 const [country,setCountry]= useState(null)
let message = <div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
No  matches. Specify another filter</div>
  
 const loadCurrentWeatherByLatLon= async(lat, lon,apiKey)=> await weatherService.getCurrentWeatherBylatlon(lat,lon,apiKey)//.then(res=>res);
 const loadCurrentWeatherByCity= async(city,apiKey)=> await weatherService.getCurrentWeatherByCity(city,apiKey).then(res=>{
    const weather =  res;
    setWeather(weather);
   }).catch(error=>{
    setWeather({});
    message=<div style={{color:'red',borderStyle:'solid',borderColor:'red'}}>
         The weather data could not be retrieved. {error}</div>
  
  
  });
 
 const loadWeatherIcon = async(iconCode)=>await weatherService.getWeatherIcon(iconCode)
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

 const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
 console.log('api key', APIKey)
  let   countryNames =[],  pageSize=10, pages =[], countryNamesParts=[]
  if(search)
  {
    console.log('type search term', search)
    const filterCountries = countries.filter(f=>f["name"]["common"].toLowerCase().includes(search.toLowerCase()))
    let count= filterCountries.length ; let refreshCountry= false,refreshWeather=false;
     console.log('filtered countries',filterCountries)
     refreshCountry = count===1 && country?.name!==search? true : false
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
      else if( count===1   && (!weather || weather?.name!==filterCountries[0].capital[0]))
        {
          console.log('weather city',weather?.name)
            console.log('Weather country',filterCountries[0].capital[0])
          const city = filterCountries[0].capital;
          loadCurrentWeatherByCity(city,APIKey);
          console.log('weather response for ',city,weather)
          message='';
        } 
   
    else if(count===1 && (!country || country.name!==search))
     {
       console.log('filtered country',filterCountries[0])
                   let selectedCountry={}
                   selectedCountry.name= filterCountries[0].name.common;
                   selectedCountry.capital= filterCountries[0].capital[0];
                   selectedCountry.area= filterCountries[0].area;
                   selectedCountry.languages= filterCountries[0].languages;
                   selectedCountry.flag=filterCountries[0].flags.png;
                   selectedCountry.latitude = filterCountries[0].latlng[0];
                   selectedCountry.longitude = filterCountries[0].latlng[1];

                 

                // const cityWeatherByLatLon= loadCurrentWeatherByLatLon(country.latitude,country.longitude,APIKey);
                  //const cityWeatherByCity=  weatherService.getCurrentWeatherByCity(country.capital,APIKey).then(res=>res)
                /* const getWeather= async function  (city,key){
                 const res = await weatherService.getCurrentWeatherByCity(city,key)
                 console.log('weather response',res,new Date())
                 return res;
               
                } 
                  
                 const cityWeatherByCity = getWeather(country.capital,APIKey); */

                 console.log('weather data ',weather)

                 selectedCountry.wind_speed = weather.wind.speed;
                 selectedCountry.temp = weather.main.temp;
                 
                   
                  //  country.weatherIcon = loadWeatherIcon( cityWeatherByCity.weather[0].icon);

                  
                  
                  
                 
             
                  
                   console.log('country',country);
                   message='';

                   setCountry(selectedCountry);
         
     }
     else{
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
