import React, { Component } from 'react';
import './index.css';
import { Post } from '../Post';

export class Content extends Component {
    render() {
        return (
            <div>
                <h1>Content</h1>
                <Post />
            </div>
        );
    }
}

export default Content;