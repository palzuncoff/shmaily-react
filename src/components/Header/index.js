import React, { Component } from 'react';
import './index.css';
import logo from './img/logo.png';

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      buttons: [
        {
          name: 'From Down',
          title: 'test'
        },
        {
          name: 'From Top',
          title: 'test'
        },
        {
          name: 'From Shuffle',
          title: 'test'
        }
      ]
    }
  }
    render() {
        return (
          <header className="header">
            <div className="wrapper">
              <div className="header-wrap">
                <a href="/" className="logo">
                  <img src={logo} className="logo-img" />
                </a>
                <nav className="header-nav">
                  <ul className="header-list">
                    {this.state.buttons.map(bt =>
                      <li className="header-li" key={bt.name}>
                        <button className="header-bt" title={bt.title}>{bt.name}</button>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        );
    };
};

export default Header;
