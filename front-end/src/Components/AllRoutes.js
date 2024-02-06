import {Route , Routes} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUP';
import MyBlogs from './MyBLogs';
import Create from './Create'
import Blogs from './Blogs';
import About from './About';
import Contact from './Contact';
import BlogDetail from './BlogDetail';


 const AllRoutes=()=>{
return(

<Routes>
<Route path="/login"  element={<Login/>}></Route>
<Route path="/Signup"  element={<SignUp/>}></Route>
<Route path="/"  element={<Home/>}></Route>
<Route path="/Blogs"  element={<Blogs/>}></Route>
<Route path="/myBlogs"  element={<MyBlogs/>}></Route>
<Route path="/blogDetail/:id"  element={<BlogDetail/>}></Route>


<Route path="/create"  element={<Create/>}></Route>
{/* <Route path="/about"  element={<About/>}></Route>
<Route path="/contact"  element={<Contact/>}></Route> */}


</Routes>
)
}
export default AllRoutes;