import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Splash from './pages/Splash/Splash.jsx';
import Login from './pages/Login/Login.jsx';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<Splash/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
