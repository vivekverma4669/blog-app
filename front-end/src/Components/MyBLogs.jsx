import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
const Blogs = () => {

  const { token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (type) => {
  setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7000/blogs?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setBlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(type);
  }, [token, type]);

  const justfetch = () => {
    setType('');
  };

  const onlytech = () => {
    setType('tech');
  };

  const onlyFood = () => {

    setType('food');
  };

  const onlyNews = () => {
    setType('news');
  };






  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('blog deleted');
      
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };




  return (
    <div>

<div className="post-filter container" style={{ display: 'flex', gap: '10px', margin: 'auto', width: '300px', padding: '20px', fontSize: '20px', justifyContent: 'space-between', border: '2px solid black', borderEndStartRadius: '10px', borderEndEndRadius: '10px' }}>
        <span className="filter-item" onClick={justfetch}  id={type===''? 'active-filter' : ''}>All</span>
        <span className="filter-item" onClick={onlytech}  id={type==='tech'? 'active-filter' : ''}>Tech</span>
        <span className="filter-item" onClick={onlyFood} id={type==='food'? 'active-filter' : ''}>Food</span>
        <span className="filter-item" onClick={onlyNews} id={type==='news'? 'active-filter' : ''}>News</span>
</div>

      <h2>Your Blogs</h2>

      

      
      <div style={{display :'flex' , flexDirection :'column' , rowGap : '30px' , padding :'70px' , justifyContent:'center'}}>
      {
         !loading? 
 
              blogs.map((blog) => (
                
              <div key={blog._id}  style={{width : '100%', border :'2px solid black', display :'flex' , textAlign :'center' , borderRadius:'10px'}}>
              <Link to={`/blogDetail/${blog._id}`}>  <img src={blog.imageUrl}  style={{height :'260px', width : '370px'}} /> </Link>
              <div style={{display :'flex' , flexDirection :'column' , justifyContent :'space-between'}}>
              <h3> Title :{blog.title}</h3>
              <p>Type: {blog.type}</p>
              <p>{blog.content}</p>
              <p>Author: {blog.auth_email}</p>
              
              <div align='right' >
              <Link to={`/blogDetail/${blog._id}`} > <button  style={{margin :'10px'}} > Edit <img src='https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png' style={{width: "20px"}}/> </button> </Link>
                <button style={{margin :'10px'}} onClick={()=>{handleDelete(blog._id)}}>Delete  <img src='https://cdn-icons-png.flaticon.com/512/3687/3687412.png' style={{width: "20px"}}/></button>
              </div>

              </div>

             
              </div>
            
          ))
          :
          <img  src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{width :'250px'}} />


      }

      {
  blogs.length===0?
  <div style={{width :'600px' , margin: 'auto'}}>
  <img src='https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif' />
  </div>
        : ""
  } 
        
        
      </div>
     
        
    </div>
  ) 
};

export default Blogs;
