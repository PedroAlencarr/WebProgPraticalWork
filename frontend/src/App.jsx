import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Splash from './pages/Splash/Splash.jsx';
import Login from './pages/Login/Login.jsx';
import Header from './components/Header/Header.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Splash/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
