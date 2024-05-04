import './App.css';

//Router
import {BrowserRouter, Routes, Route, navigate} from "react-router-dom"

//Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

//Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
		  <BrowserRouter>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
