import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './index.css';

export class Header extends Component {
    render() {
        return (
            <div>
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
        );
    };
};

export default Header;