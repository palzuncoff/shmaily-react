import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { Post } from '../Post';

export class Content extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div>
                <h1>Content</h1>
                {posts.map(post => <Post
                    key={post.id}
                    caption={post.caption}
                    media={post.media}
                    topic={post.topic}
                    pubDate={post.pubDate}
                />)}
            </div>
        );
    }
};

Content.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
};

export default Content;