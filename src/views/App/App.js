import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from '/Users/jamestucker/Coding-Projects/React/kiva_hero/src/components/Nav/Nav.js'
import About from './../About/About';
import LendingProfiles from './../Lending/LendingProfiles';

function App() {
  return (
    <div>
      <header>
        <Router>
          <Nav />
          <Route exact path="/" component={LendingProfiles} />
          <Route exact path="/about" component={About} />
        </Router>
      </header>
      <div align="center">
        <footer>
          ©2019 KivaHero is not supported by Kiva.org.
      </footer>
      </div>
    </div >
  );
}

export default App;
