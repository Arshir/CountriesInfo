const DisplayPageLinks= ({pageList,showPage})=>{
    if(pageList.length<=0)
      return
     else{
         return(
             <>
                { pageList.map(p=> <button onClick={()=>showPage(p)}>{p}</button> )}
 
             </>
         )
     }
 }
 
 export default DisplayPageLinks;