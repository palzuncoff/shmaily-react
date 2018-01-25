import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export class Sidebar extends Component {
    render() {
        return (
            <div className="col-3">
                <aside className="sidebar">
                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__li">
                                <Link to="/pictures" className="nav__a">Pictures</Link>
                            </li>
                            <li className="nav__li">
                                <Link to="/videos" className="nav__a">Videos</Link>
                            </li>
                            <li className="nav__li">
                                <Link to="/coubs" className="nav__a">Coubs</Link>
                            </li>
                            <li className="nav__li">
                                <Link to="/articles" className="nav__a">Articles</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>
        );
    };
}

export default Sidebar;