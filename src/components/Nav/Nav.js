import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="nav" align="center">
                <Link to="/">
                    <h2 className="nav-title">KivaHero</h2>
                </Link>
            </div>
        )
    }
}


export default Nav;