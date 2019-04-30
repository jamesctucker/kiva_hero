import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from '../Nav/Nav';
import Home from './../Home/Home';
import About from './../About/About';
import Lend from './../Lending/Lend';

function App() {
  return (
    <div>
      <header>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/lend" component={Lend} />
        </Router>
      </header>
    </div >
  );
}

export default App;
