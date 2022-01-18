import React, { useState } from 'react'
import axios from 'axios';
import { setUserSession } from '../Utils/common';
import '../app.css';
import logo2 from '../assets/images/logo2.png';

export const Login = (props) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var userobj = {
      "username": userName,
      "password": password
    };

    axios.post('https://flyworex.azurewebsites.net/api/Authenticate/login', userobj,
      {
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then(response => {
        var userinfo = {
          username: userName,
          role: response.data.role
        }
        setUserSession(response.data.token, userinfo)
        localStorage.setItem("user-info", JSON.stringify(response.data))
        console.log(response.data)
        props.history.push(`${process.env.PUBLIC_URL}/dashboard/landing`)
      }

      ).catch(error => {
        console.log(error)
        alert('check your userName or Password')
      });
  };

  return (
    <>
      <div>
        <div className="page-wrapper">
          <div className="container-fluid p-0">
            {/* <!-- login page start--> */}
            <div className="authentication-main">
              <div className="row">
                <div className="col-md-12">
                  <div className="auth-innerright">
                    <div className="authentication-box">
                      <div className="text-center">
                        <img src={logo2} width={300} style={{ 'borderRadius': '45px' }} alt="" /></div>
                      <div className="card mt-4">
                        <div className="card-body">
                          <div className="text-center">
                            <h4>LOGIN</h4>
                            <h6>{"Enter your Username and Password"} </h6>
                          </div>
                          <form className="theme-form" >
                            <div className="form-group">
                              <label className="col-form-label pt-0">Your Name</label>
                              <input className="form-control" type="email" name="email"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}

                                placeholder="Email address"
                              />

                            </div>
                            <div className="form-group">
                              <label className="col-form-label">Password</label>
                              <input className="form-control" type="password" name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />

                            </div>
                            <div className="checkbox p-0">
                              <input id="checkbox1" type="checkbox" />
                              <label htmlFor="checkbox1">Remember Me</label>
                            </div>
                            <div className="form-group form-row mt-3 mb-0">
                              <button className="btn btn-primary btn-block" type="button" disabled={!validateForm()} onClick={(e) => handleSubmit(e)} >Login</button>
                            </div>
                            <div className="form-group form-row mt-3 mb-0 button-auth">
                              <div className="col-md-6">
                                <button className="btn btn-secondary btn-block" type="button" >Login With JWT</button>
                              </div>
                              <div className="col-md-6">
                                <button className="btn btn-success btn-block" type="button" >Login With Auth0</button>
                              </div>
                            </div>
                            <div className="login-divider"></div>
                            <div className="social mt-3">
                              <div className="form-group btn-showcase d-flex">
                                <button className="btn social-btn btn-fb d-inline-block" type="button" > <i className="fa fa-facebook"></i></button>
                                <button className="btn social-btn btn-twitter d-inline-block" type="button" ><i className="fa fa-google"></i></button>
                                <button className="btn social-btn btn-google d-inline-block" type="button" ><i className="fa fa-twitter"></i></button>
                                <button className="btn social-btn btn-github d-inline-block" type="button" ><i className="fa fa-github"></i></button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- login page end--> */}
          </div>
        </div>
      </div>
    </>
  );
};