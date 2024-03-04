import logo from './logo.svg';
import './App.css';

function App() {
  console.log('Process.env :', process.env);

  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL;
  console.log('Base URL :', base_url);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{base_url}</p>
      </header>
    </div>
  );
}

export default App;
