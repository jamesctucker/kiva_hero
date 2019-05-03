import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from '../Nav/Nav';
import About from './../About/About';
import LendingProfiles from './../Lending/LendingProfiles';

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Route exact path="/" component={LendingProfiles} />
        <Route exact path="/about" component={About} />
      </Router>
    </div >
  );
}

export default App;
