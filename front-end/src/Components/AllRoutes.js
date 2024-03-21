import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUP'
import MyBlogs from './MyBLogs';
import Create from './Create';
import Blogs from './Blogs';
import About from './About';
import BlogDetail from './BlogDetail';
import PrivateRoute from './privateRoute';

const AllRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/about" element={<About />} />

      <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
      <Route path="/myBlogs" element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
      <Route path="/blogDetail/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
      <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default AllRoutes;
