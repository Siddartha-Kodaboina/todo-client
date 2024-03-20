import { useCallback } from 'react';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import './App.css';
import useFirebaseUser from './hooks/useFirebaseUser'; 
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Particle from  './Particle';

function App() {
  const user = useFirebaseUser();
  // console.log(user);



  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL;
  return (
    
    <Router className='App'>
      
      <div className='AppBody'>
        
        {user && <NavigationBar />}
        <Particle className='particles'/>
        <Routes>
          
          <Route path="/" element={user? <Home base_url={base_url}/>: <Navigate replace to="/login"/>}/>
          <Route path="/login" element={!user? <Login/>: <Navigate replace to="/"/>}/>
          <Route path="/forgot-password" element={!user? <ForgotPassword/>: <Navigate replace to="/"/>}/>
          <Route path="/reset-password" element={!user? <ResetPassword/>: <Navigate replace to="/"/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;







