
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './detail.css';
import { AuthContext } from './AuthContext';
import { blueGrey } from '@mui/material/colors';
// import { Link } from 'react-router-dom';


const BlogDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlog(response.data[0]);
        setFormData({
          title: response.data[0].title,
          content: response.data[0].content,
          type: response.data[0].type,
          imageUrl: response.data[0].imageUrl
        });
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      }
    };
    fetchBlog();
  },[id, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/blogs/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog updated successfully');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog deleted');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!blog) {
    return <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='loading' style={{width :'250px'}} />;
  }
 
  return (
   <>

    <div style={{width:'90%' ,margin :'auto' , borderRadius:' 15px' , border: '2px solid black' , marginTop :'20px'}}>
      <div>
        <img src={blog.imageUrl} style={{ height:'400px'}} alt="Blog cover" />
      </div>
      
      <h2>title: {blog.title}</h2>
      <p> {blog.content}</p>

      <p align='left'>Author: {blog.auth_email}</p>

     
             <div align='right' >
             <a href='#update' ><button  style={{margin :'10px'}} > Edit <img src='https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png' style={{width: "20px"}}/> </button> </a>
                <button style={{margin :'10px'}} onClick={()=>{handleDelete(blog._id)}}>Delete  <img src='https://cdn-icons-png.flaticon.com/512/3687/3687412.png' style={{width: "20px"}}/></button>
              </div>
      

    



    </div>

      <div style={{display:'flex' , flexDirection :'column' , rowGap: '20px' , boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' , width :'90%', margin :'auto' , marginTop: '100px' , padding:'20px' , backgroundColor :'silver'}} id='update' > <h2>Update Blog</h2>
      <form onSubmit={handleSubmit} style={{display:'flex' , flexDirection :'column' , rowGap: '20px', width:'100%'}} >
        <label>
          Title: <br/>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Content:<br/>
          <textarea name="content" value={formData.content} onChange={handleChange} />
        </label>
        <label>
          Type:<br/>
          <input type="text" name="type" value={formData.type} onChange={handleChange} />
        </label>

        <label>
          Image URL:<br/>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>
         
         <div>
        <button type="submit">Update Blog</button>
        </div>
      </form>
      </div>
      </>
  );
};

export default BlogDetail;
