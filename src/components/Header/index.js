import React, { Component } from 'react';
import './index.css';
import logo from './img/logo.png';

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="wrapper">
                    <div className="header-wrap">
                        <a href="/" className="logo">
                            <img src={logo} className="logo-img" alt="logo" />
                        </a>
                        <nav className="header-nav">
                            <ul className="header-list">
                                <li className="header-li">
                                    <button className="header-bt" title="test">From Down</button>
                                </li>
                                <li className="header-li">
                                    <button className="header-bt" title="test">From Top</button>
                                </li>
                                <li className="header-li">
                                    <button className="header-bt" title="test">From Shuffle</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        );
    };
};

export default Header;
