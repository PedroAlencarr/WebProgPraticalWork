import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Splash from './pages/Splash/Splash.jsx';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<Splash/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
