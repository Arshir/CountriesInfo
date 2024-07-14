const DisplayList= ({list,showDetail})=>{
   if(!list )
     return
    else{
        return(
            <ul>
               { list.map(i=>  <li> {i} <button onClick={()=>showDetail(i)}>Show</button></li> )}

            </ul>
        )
    }
}

export default DisplayList;