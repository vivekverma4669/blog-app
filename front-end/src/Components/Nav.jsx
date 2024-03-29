import React, { useState } from "react";
import "./Nav.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

 const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setLoggedIn, setToken , user} = useContext(AuthContext);
  console.log(user);
  return ( 
     
    <nav>
      <Link to="/" className="title">
        {/* Website */}
      <img src="https://static.vecteezy.com/system/resources/thumbnails/024/553/534/small/lion-head-logo-mascot-wildlife-animal-illustration-generative-ai-png.png" alt='logo ' style={{height: "80px"}}/>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
      <li>
          <NavLink to="/">Home  </NavLink>
        </li>


        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>

        <li>
          <NavLink to="/myBlogs">My-Blogs</NavLink>
        </li>


        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
      </ul>

       <div style={{marginRight: "30px"}}>
     <h3><NavLink to="/login" style={{borderRadius :"5px", padding:'10px'}}> {user? 'Login' : user.email} </NavLink> </h3> 
      </div>
      
    </nav>
  );
};
 export default Navbar;