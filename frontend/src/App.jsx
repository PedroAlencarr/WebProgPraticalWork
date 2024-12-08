import './assets/styles/index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile.jsx';
import TaskCreation from './pages/TaskCreation/TaskCreation.jsx'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx';
import PublicRoute from './components/PublicRoute/PublicRoute.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route 
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
            />
            <Route 
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
             <Route 
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/taskcreation"
              element={
                <ProtectedRoute>
                  <TaskCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projectdetails"
              element={
                <ProtectedRoute>
                  <ProjectDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
