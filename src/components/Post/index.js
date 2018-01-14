import React, { Component, PropTypes } from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import './index.css';

export class Post extends Component {
    render() {
        return (
            <h1>Post</h1>
        );
    };
};

Post.propTypes = {
    caption: PropTypes.string,
    media: PropTypes.string,
    topic: PropTypes.string,
    pubDate: PropTypes.string.isRequired,
};

Post.defaultProps = {
    caption: '',
    media: '',
    topic: '',

};

export default Post;