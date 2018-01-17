import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'

export class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      links: [
        {
          name: 'Pictures',
          url: '/pictures'
        },
        {
          name: 'Videos',
          url: '/videos'
        },
        {
          name: 'Coubs',
          url: '/coubs'
        },
        {
          name: 'Articles',
          url: '/articles'
        },
      ]
    }
  }
    render() {
        return (
          <div className="col-3">
            <aside className="sidebar">
              <nav className="nav">
                <Router>
                <ul className="nav__list">
                  {this.state.links.map(link =>
                    <li className="nav__li" key={link.name}>
                      <Link to={link.url} className="nav__a">{link.name}</Link>
                    </li>
                  )}
                </ul>
              </Router>
              </nav>
            </aside>
          </div>
        );
    };
};

export default Sidebar;