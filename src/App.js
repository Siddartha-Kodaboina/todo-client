import Login from './components/Login';
import './App.css';
import useFirebaseUser from './hooks/useFirebaseUser'; 
import NavigationBar from './components/NavigationBar';

function App() {
  console.log('Process.env :', process.env);
  const user = useFirebaseUser();
  // console.log('Process.env :', process.env);

  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL;
  console.log('Base URL :', base_url);
  return (
    <div className="App">
      {user && <NavigationBar />}
      <Login/>
    </div>
  );
}

export default App;
