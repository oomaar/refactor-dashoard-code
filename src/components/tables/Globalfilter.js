import React from 'react'
import './tables.css'
export const GlobalFilter = ({filter,setfilter})=>{
    return(
        
            
            <input placeholder='search' className='search' value={filter||''} onChange={e=>setfilter(e.target.value)}></input>
        
    )
}