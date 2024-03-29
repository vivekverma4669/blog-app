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
        <h2 className="home-title">Loe Blogger</h2>
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
    blogs.length!=0? 
    (
    blogs.map((blog) => (
    
    <div className="post-box" key={blog._id} >    
      <Link to={`/blogDetail/${blog._id}`}><img src={blog.imageUrl} alt="" className="post-img"/></Link>
      <h2 className="category">{blog.type}</h2>
      <h3 className="post-title">How to create the best UI with Figma</h3>
      <span className="post-date">12 Feb 2022</span>
      <p className="post-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, similique, rerum excepturi harum, vitae facilis corrupti vel modi debitis est perferendis aut quasi ea unde repudiandae iste architecto. Corporis, voluptates.</p>
      <div className="profile">
      <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" className="profile-img"/>
      <span className="profile-name">MKHB</span>
      
      </div>
      
    </div>
    

    ))
    )
    :
    (
    <img  src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{width :'250px'}} />
    )}

    

    <div className="post-box">

    <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" className="post-img"/>
            <h2 className="category">Tech</h2>
            <a href="#" className="post-title">How to create the best UI with Figma</a>
            <span className="post-date">12 Feb 2022</span>
            <p className="post-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, similique, rerum excepturi harum, vitae facilis corrupti vel modi debitis est perferendis aut quasi ea unde repudiandae iste architecto. Corporis, voluptates.</p>
            <div className="profile">
                <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" className="profile-img"/>
             <span className="profile-name">MKHB</span></div>

    </div>


    <div className="post-box food">
        <img src="https://cutewallpaper.org/28/dark-office-wallpaper/1855027233.jpg" alt="" class="post-img"/>
            <h2 class="category">Food</h2>
            <a href="#" class="post-title">How to create the best UI with Figma</a>
            <span class="post-date">12 Feb 2022</span>
            <p class="post-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, similique, rerum excepturi harum, vitae facilis corrupti vel modi debitis est perferendis aut quasi ea unde repudiandae iste architecto. Corporis, voluptates.</p>
            <div class="profile">
                <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" class="profile-img"/>
                <span class="profile-name">MKHB</span>
            </div>
    </div>

    
    <div className="post-box">
    <img src="https://cutewallpaper.org/28/dark-office-wallpaper/1855027233.jpg" alt="" class="post-img"/>
            <h2 class="category">News</h2>
            <a href="#" class="post-title">How to create the best UI with Figma</a>
            <span class="post-date">12 Feb 2022</span>
            <p class="post-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, similique, rerum excepturi harum, vitae facilis corrupti vel modi debitis est perferendis aut quasi ea unde repudiandae iste architecto. Corporis, voluptates.</p>
            <div class="profile">
                <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" class="profile-img"/>
                <span class="profile-name">MKHB</span>
            </div>
    </div>
     


</div> 

</>
  );
};

export default Home;
