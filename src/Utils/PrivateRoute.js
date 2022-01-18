import React from 'react'
import { Route } from 'react-router'
import { getToken } from './common'
import { useNavigate } from 'react-router'
const PrivateRoute=({component:Component,...rest,history})=>{
    return(
        <Route {...rest}
        render={props=>{
            !getToken()?<Component {...props}/>
            : history.push("/")
        }}
        ></Route>
    )
}
export default PrivateRoute