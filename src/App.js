import Login from './components/Login';
import Home from './components/Home';
import './App.css';
import useFirebaseUser from './hooks/useFirebaseUser'; 
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  console.log('Process.env :', process.env);
  const user = useFirebaseUser();
  console.log(user);
  // console.log('Process.env :', process.env);

  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL;
  // console.log('Base URL :', base_url);
  return (
    
    <Router className='App'>
      {user && <NavigationBar />}
      <Routes>
        <Route path="/" element={user? <Home base_url={base_url}/>: <Navigate replace to="/login"/>}/>
        <Route path="/login" element={!user? <Login/>: <Navigate replace to="/"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
