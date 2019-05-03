import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <Link to="/">
                    <h2 className="nav-title">Kiva Hero</h2>
                </Link>
                <div className="nav-right">
                    <Link to="/">
                        <h2 className="nav-link">Lend</h2>
                    </Link>
                    <Link to="/about">
                        <h2 className="nav-link">About</h2>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Nav;