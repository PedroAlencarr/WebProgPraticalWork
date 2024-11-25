import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Splash from './pages/Splash/Splash.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Profile from './pages/Profile/Profile.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Splash/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
