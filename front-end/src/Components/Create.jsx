import React, { useContext, useState } from 'react';
import './create.css';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const CreateBlog = () => {
  const { token } = useContext(AuthContext);
  const [loading , setLoading] =useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null);
  
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'rlepuqbu');
      formData.append('cloud_name', 'dlh00zgbt');

      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dlh00zgbt/image/upload', {
        method: 'POST',
        body: formData
      });
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;
           console.log(imageUrl);
      // Create blog post
      const response = await axios.post('http://localhost:7000/blogs/create', {
        title,
        content,
        type,
        imageUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

       alert('blog created succesfully 🎉');
      console.log(response.data);
      setTitle('');
      setContent('');
      setType('');
      setImage(null);
      setImagePreview(null)

    } catch (error) {
      console.error('Error creating blog:', error);
    }
    setLoading(false);
  };

  return (
    <>
     
     {loading? (<img style={{width :'500px'  , borderRadius:'30px'}} src='https://i.pinimg.com/originals/68/1d/d2/681dd2c6e0f1b52a9a5dc7c995b14ef2.gif'/>) :(
    <div className="form-container">

   
      <h2 style={{color: 'black'}}>Create Blog</h2>

      <form onSubmit={handleSubmit} style={{width: '500px', margin: 'auto', display: 'flex', flexDirection: 'column', marginLeft: '200px', marginTop: '10px', }}>
        <h2 style={{color: 'black'}}>Write Your Blog</h2>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="tech">Tech</option>
            <option value="news">News</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
        <label>Image:</label>
          <input type="file"  onChange={handleImagePreview} required />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '100px' }} />}
        </div>
        <button type="submit" >Create Blog</button>
      </form>
     

    </div>
     )}
    </>
  );
};

export default CreateBlog;
