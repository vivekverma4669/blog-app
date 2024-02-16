import React, { useState, useContext } from 'react';
import axios from 'axios';
import './login.css';
import { AuthContext } from './AuthContext';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setLoggedIn, setToken , setUser  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading]= useState(false);
  const [err, setErr]= useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:7000/login', formData);
      const { token } = response.data;
      const { email } = formData;
      console.log(response.data);
     

      setToken(token);
      setLoggedIn(true);
      console.log(email);
      setUser( email );
      localStorage.setItem('userEmail',email);
       
      alert('Login Succesfull✅  Redirect to home page ');
      navigate('/'); 
    }catch (error) {
      setErr(true);
      console.error('Error logging in:', error);
    }
     
      setLoading(false);

  };
  

  return (

  <div style={{backgroundImage : "url('https://media1.tenor.com/m/9n_ZqBC2y_wAAAAC/nature-japan.gif')" , backgroundRepeat : 'no-repeat', width :'100%',  backgroundSize: 'cover', height :'800px' , display: 'flex' , marginBottom:'-140px' }}>

  <div class="wrapper" >

    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

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
        <a href="#">Forgot Password</a>
      </div>

      <button type="submit" class="btn">Login</button>

       {err? <p style={{color :'red'}}>Wrong email or password</p>
       : ""

       }
      <div class="register-link">
        <p>Dont have an account?  <NavLink to="/signup" style={{color :'silver'}}>Register now</NavLink> </p>

      </div>

    </form> 
  </div>

         </div> 



  );
};




export default Login;
