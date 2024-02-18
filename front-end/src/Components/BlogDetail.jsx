import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

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
        const response = await axios.get(`https://grumpy-hare-sunbonnet.cyclic.app/blogs/${id}`, {
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
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://grumpy-hare-sunbonnet.cyclic.app/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog deleted');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', formData.image);
      formData.append('upload_preset', 'rlepuqbu');
      formData.append('cloud_name', 'dlh00zgbt');

      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dlh00zgbt/image/upload', {
        method: 'POST',
        body: formData
      });
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      const response = await axios.post(`https://grumpy-hare-sunbonnet.cyclic.app/blogs/update/${id}`, {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        imageUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data);
      setFormData({
        title: '',
        content: '',
        type: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (!blog) {
    return <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='loading' style={{ width: '250px' }} />;
  }

  return (
    <>
      <div style={{ width: '90%', margin: 'auto', borderRadius: '15px', border: '2px solid black', marginTop: '20px' }}>
        <div>
          <img src={blog.imageUrl} style={{ height: '400px' }} alt="Blog cover" />
        </div>
        <h2>Title: {blog.title}</h2>
        <p>{blog.content}</p>
        {/* <p align='left'>Author: {blog.auth_email}</p> */}

        <div align='right' >
              <span>Author: {blog.auth_email}</span>
         <a href='#update'>      <button  style={{margin :'10px'}} > Edit <img src='https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png' style={{width: "20px"}}/> </button> </a>
              <button style={{margin :'10px'}} onClick={handleDelete}>Delete  <img src='https://cdn-icons-png.flaticon.com/512/3687/3687412.png' style={{width: "20px"}}/></button>
        </div>


      </div> 

      {/* Update form */}


    <div id='update'  style={{backgroundColor:"grey" , borderRadius:'20px' , margin:'40px'}}>

      <h2 style={{ color: 'black' }}>Edit Blog</h2>


      <form onSubmit={handleSubmit} style={{margin :'auto' , width :'80%' , padding :'30px' , marginBottom :'30px'}}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </div>

        <div>
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="tech">Tech</option>
            <option value="news">News</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

          <div>
            <label  >Image:</label>
            <input type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} required  />
          </div>

          <button type="submit" style={{backgroundColor :'teal' , color :'whitesmoke'}}>Update Blog</button>

        </form>
        </div>
    </>

  );
};

export default BlogDetail;
