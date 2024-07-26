import axios from "axios";
const weatherBaseUrl ='https://api.openweathermap.org/data/2.5/weather' //?lat={lat}&lon={lon}&appid={API key}';
const weatherIconUrl='https://openweathermap.org/img/wn/{iconCode}@2x.png'

console.log('data source url',weatherBaseUrl)

const  getCurrentWeatherBylatlon= async (lat, lon,key)=> {
  try {
    let currentWeatherUrlByLatlon =weatherBaseUrl+'?lat='+lat+'&lon='+lon+'&appid='+key
  
    const res= await axios.get(currentWeatherUrlByLatlon)
    const weatherByLatLon = res.data;
     console.log('weather by latlon ',weatherByLatLon)
     return  weatherByLatLon
  } catch (error) {
    console.log('An error occurred while attempting to get weather by latlon',error)
  }

}

const  getCurrentWeatherByCity= async (city,key)=> {
  try {
     console.log('city and the key',city, key)
    let currentWeatherUrlByCity=weatherBaseUrl+'?q='+city+'&appid='+key;
    console.log('weather url:',currentWeatherUrlByCity)
   const res= await axios.get(currentWeatherUrlByCity);
 
   const weatherByCity = res.data;
   console.log('weather by city',weatherByCity,new Date());
    return weatherByCity;
  } catch (error) {
      console.log('Error occurred when attempting to get weather by city',error)
  }
 

}



const getWeatherIcon = async(iconCode)=>await weatherIconUrl.replace('{iconCode}',iconCode)
    // {
    // console.log('getting the data')
   
        
      /*   const data=res.data;
        console.log(data)
        return data;
    })
}; */

console.log('data load completed')

const weatherService = {getCurrentWeatherBylatlon,getCurrentWeatherByCity,getWeatherIcon}

export default weatherService;