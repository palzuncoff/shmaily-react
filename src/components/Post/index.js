import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import './index.css';

export class Post extends Component {
    state = {
        areCommentsOpen: false,
    };

    handleOpenComments = () => this.setState({ areCommentsOpen: !this.state.areCommentsOpen });

    handleNewComment(comment) {
        console.log(comment.text);
    }

    render() {
        const { author, body, coubs, date, id, title, pictures, videos } = this.props;
        const { areCommentsOpen } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <h3>{author}</h3>
                <h6>{date}</h6>
                {pictures.length > 0 && <img src={pictures[0]} />}
                {body && <div>{body}</div>}
                <input
                    type="button"
                    value={areCommentsOpen ? 'Hide comments' : 'Show comments'}
                    onClick={this.handleOpenComments}
                />
                {areCommentsOpen && <ReactDisqusComments
                    shortname="example"
                    identifier="something-unique-12345"
                    title="Example Thread"
                    url="http://www.example.com/example-thread"
                    category_id="123456"
                    onNewComment={this.handleNewComment}
                />}
            </div>
        );
    };
};

Post.propTypes = {
    author: PropTypes.string,
    body: PropTypes.string,
    coubs: PropTypes.array,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    pictures: PropTypes.array,
    videos: PropTypes.array,
};

Post.defaultProps = {
    author: 'Shmailer',
    body: '',
    coubs: [],
    title: 'Post-Shmost',
    pictures: [],
    videos: [],

};

export default Post;