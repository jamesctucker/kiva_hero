import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Nav from '../Nav/Nav';
import Home from './../Home/Home';
import About from './../About/About';
import Lend from './../Lending/Lend';

function App() {
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
          Learn React Now
        </a>
      </header>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/lend" component={Lend} />
        </div>
      </Router>
    </div>
  );
}

export default App;
