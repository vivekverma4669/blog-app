import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './hf.css';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const { token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

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


  return (
    <>
    <section className="home" id="home">
    <div className="home-text container">
        <h2 className="home-title">Leo Blogger</h2>
        <span className="home-subtitle">Your source of great content</span>
    </div>
</section>



<section className="about container" id="about">
    <div className="contentBx">
        <h2 className="titleText">Catch up with the trending topics</h2>
        <p className="title-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum eos consequuntur voluptate dolorum totam provident ducimus cupiditate dolore doloribus repellat. Saepe ad fugit similique quis quam. Odio suscipit incidunt distinctio.
            <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed blanditiis libero pariatur ipsum suscipit voluptates aut, repellendus quos dolor autem, natus laboriosam consectetur maxime cumque, sunt magni optio? Veritatis, ea?
        </p>
        <a href="/" className="btn2">Read more</a>
    </div>
    <div className="imgBx">
        <img src="https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMGNsb3NlJTIwdXB8ZW58MHx8MHx8fDA%3D" alt="" className="fitBg" />
    </div>
</section>




<div className="post-filter container" style={{display :'flex', gap :'10px' , margin :'auto' , width :'300px', padding: '20px'}}>
<span className="filter-item" onClick={justfetch}  id={type===''? 'active-filter' : ''}>All</span>
        <span className="filter-item" onClick={onlytech}  id={type==='tech'? 'active-filter' : ''}>Tech</span>
        <span className="filter-item" onClick={onlyFood} id={type==='food'? 'active-filter' : ''}>Food</span>
        <span className="filter-item" onClick={onlyNews} id={type==='news'? 'active-filter' : ''}>News</span>
</div>





<div className="post container">

{
    !loading? 
    (
    blogs.map((blog) => (
    
    <div className="post-box" key={blog._id} >    
      <Link to={`/blogDetail/${blog._id}`}><img src={blog.imageUrl} alt="" className="post-img"/></Link>
      <h2 className="category">{blog.type}</h2>
      <h3 className="post-title">{blog.title}</h3>
      <span className="post-date">12 Feb 2022</span>
      <p className="post-description">{blog.content}</p>
      <div className="profile">
      <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" className="profile-img"/>
      <span className="profile-name">{blog.auth_email}</span>
      </div>
    </div>
    

    ))
    )
    :
    (
    <img  src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{width :'250px'}} />
    )}

    
      {
  blogs.length===0?
  <img src='https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif' />
        : ""
  } 

    

   
   <Link to='/blogs'> <h3 style={{textAlign :'center' , backgroundColor :'rgb(77, 228, 255)' , padding :'10px' , borderRadius:'10px' , width:'fit-content' , margin:'auto' , color:'black'}}>Read More Blogs  </h3>    </Link> 


</div> 

</>
  );
};

export default Home;
