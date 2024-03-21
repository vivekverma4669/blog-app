
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Blogs = () => {


  const { token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const fetchBlogs = async (type) => {
    setLoading(true);
    try {  //https://grumpy-hare-sunbonnet.cyclic.app
      const response = await axios.get(`${window.location.origin}./blogs?type=${type}`, {
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
    <div>
      <div className="post-filter container" style={{ display: 'flex', gap: '10px', margin: 'auto', width: '300px', padding: '20px', fontSize: '20px', justifyContent: 'space-between', border: '2px solid black', borderEndStartRadius: '10px', borderEndEndRadius: '10px' }}>
        <span className="filter-item" onClick={justfetch}  id={type===''? 'active-filter' : ''}>All</span>
        <span className="filter-item" onClick={onlytech}  id={type==='tech'? 'active-filter' : ''}>Tech</span>
        <span className="filter-item" onClick={onlyFood} id={type==='food'? 'active-filter' : ''}>Food</span>
        <span className="filter-item" onClick={onlyNews} id={type==='news'? 'active-filter' : ''}>News</span>
      </div>

      <u><h2 style={{ marginTop: '20px' }}>Latest  <span style={{ color: 'blueViolet' }}> Blogs </span></h2></u>

      <div className="post container">
        {
          !loading? (
            blogs.map((blog) => (
              <div className="post-box" key={blog._id}>
                <img src={blog.imageUrl} alt="" className="post-img" />
                <h2 className="category">{blog.type}</h2>
                <Link to={`/blogDetail/${blog._id}`}><h3 className="post-title">{blog.title}</h3></Link>
                <span className="post-date">2 Feb 2024</span>
                <p className="post-description">
               {blog.content}
                </p>
                <div className="profile">
                  <img src="https://pics.craiyon.com/2023-07-15/32c89c16131e490ab3536dc2e91bccb3.webp" alt="" className="profile-img" />
                  <span className="profile-name">{blog.auth_email}</span>
                </div>
              </div>
            ))
          ) : (
            <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{ width: '250px' }} />
          )
        }

        {
  blogs.length===0?
  <img src='https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif' />
        : ""
  } 


      </div>
    </div>
  );
};

export default Blogs;
