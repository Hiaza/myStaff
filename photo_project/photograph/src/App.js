import React from 'react';
import './App.css';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div id="content">
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
    
    /*<div className="App">
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
      </header>
    </div>*/
