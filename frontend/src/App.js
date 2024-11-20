import './App.css';
import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
