const ShowDetail=({country})=>{
  if(!country)
    return
  console.log('showing details',country)
  let languages=[]; let temp,windspeed =''
  temp= country.temp; windspeed = country.wind_speed;
  console.log('temperature,wind speed',temp,windspeed)

  Object.keys(country.languages).forEach(key=>{
    //console.log('languages',country.languages["ara"]);
    languages.push(country.languages[key])
  }
  )
  return (
  <div>
    <h2>{country.name}</h2>
    <h3>{country.capital[0]}</h3>
    <h3>{country.area}</h3>


   
    
       <h3><em>languages: </em> </h3>
        <ul>
          {languages.map(l=><li>{l}</li>)}
       </ul>

    <p><img src={country.flag} alt="country flag" height={50} width={50} /></p>

    <h3><em>Weather in {country.capital[0]}</em></h3>

    <p>temperature {temp}</p>

    {/* <p><img src={country.weatherIcon} alt="weather icon" height={50} width={50} /></p> */}

    <p>wind {windspeed} m/s</p>




</div>
  )
}

  export default ShowDetail;