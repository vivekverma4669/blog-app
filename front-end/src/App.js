import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import AllRoutes from './Components/AllRoutes';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/Nav';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div className="App">

    <Navbar/> 
     <AllRoutes/>      
    <Footer/>

    </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
