import { Redirect } from 'react-router'
import { getToken } from './common'
import React from 'react'
const PublicRoute=({children})=>{
            console.log(getToken()===null)
            return  getToken()?children: <Redirect to="/"></Redirect>
        
        
    
}
export default PublicRoute