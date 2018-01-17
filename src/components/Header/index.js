import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './index.css';

export class Header extends Component {
    render() {
        return (
            <header className="header">
            <div className="wrapper">
              <div className="header-wrap">
                <h1>Header</h1>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    From Down
                </Button>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    From Top
                </Button>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    From Shuffle
                </Button>
              </div>
            </div>
          </header>
        );
    };
};

export default Header;