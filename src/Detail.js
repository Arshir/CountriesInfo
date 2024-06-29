const ShowDetail=({country})=>{
  if(!country.name)
    return
  console.log('showing details')
  let languages=[];
  Object.keys(country.languages).forEach(key=>{
    console.log('languages',country.languages["ara"]);
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

    <img src={country.flag} alt="country flag" height={50} width={50} />

</div>
  )
}

  export default ShowDetail;