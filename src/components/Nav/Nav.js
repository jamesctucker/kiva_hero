import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render()
    <div>
    <Link to="/lend">
        <h2 className="nav-title">Lend</h2>
    </Link>
    <Link to="/about">
        <h2 className="nav-title">About</h2>
    </Link>
</div>
}


export default Nav;