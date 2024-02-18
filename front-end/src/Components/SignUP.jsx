import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/SignUp', formData);
      console.log(response.data);
      setFormData({ name: '', email: '', password: '' });
      alert('Account Created ✅  Login now ');
      navigate('/login'); // Redirect to login page
    }
    catch (error) {
      console.error('Error signing up:', error);
    }
  };
 
  return (
    <div style={{backgroundImage: "url('https://steamuserimages-a.akamaihd.net/ugc/840332610283039051/A4997E43ADA6CD046F63AF9B25D358280DD493D7/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')", backgroundRepeat: 'no-repeat', width: '100%', backgroundSize: 'cover', height: '800px', display: 'flex', marginBottom: '-140px' }}>
      <div class="wrapper" >
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div class="input-box">
            <input type="name" name="name" value={formData.name} onChange={handleChange} placeholder='name' required />
            <i class='bx bxs-user'></i>
          </div>
          <div class="input-box">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required />
            <i class='bx bxs-user'></i>
          </div>
          <div class="input-box">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required />
            <i class='bx bxs-lock-alt' ></i>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox"/>Remember Me</label>
            {/* <a href="#">Forgot Password</a> */}
          </div>
          <button type="submit" class="btn">Sign UP</button>
          <div class="register-link">
        <p>Already  have an account?  <NavLink to="/login" style={{color :'silver'}}>login now</NavLink> </p>
          </div>

        </form> 
      </div>
    </div>
  );
};

export default SignUp;
