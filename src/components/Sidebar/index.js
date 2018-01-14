import React, { Component } from 'react';
import './index.css';
import { CreatePostForm } from '../CreatePostForm';

export class Sidebar extends Component {
    render() {
        return (
            <div>
                <h1>Sidebar</h1>
                <CreatePostForm />
            </div>
        );
    };
};

export default Sidebar;