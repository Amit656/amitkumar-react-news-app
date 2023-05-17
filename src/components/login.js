import React, { useState } from 'react';
import axios from 'axios';
import './css/Login.css';
import { Link  } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Perform login logic, e.g., make an API request
    // Assuming login is successful for demonstration purposes
    const user = {
      "email":email,
      "password":password,
    };


    axios.post(`${process.env.REACT_APP_API_URL}/api/login`, user)
      .then(response => {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/open-news';
      })
      .catch(error => {
        alert(error);
    });
  };


  return (
    <div class="back">


  <div class="div-center">
    <div class="content">


      <h3>Login</h3>
      <hr />
      <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" value={email} onChange={handleEmailChange} class="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" value={password}
            onChange={handlePasswordChange} class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <hr />
        <Link to="/register">Signup</Link>
      </form>

    </div>
  </div>
  </div>
  );
};

export { Login };
