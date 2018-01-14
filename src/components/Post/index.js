import React, { Component, PropTypes } from 'react';
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
        const { caption } = this.props;
        const { areCommentsOpen } = this.state;
        return (
            <div>
                {caption && <h1>{caption}</h1>}
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

// Post.propTypes = {
//     caption: PropTypes.string,
//     media: PropTypes.string,
//     topic: PropTypes.string,
//     pubDate: PropTypes.string.isRequired,
// };
//
// Post.defaultProps = {
//     caption: '',
//     media: '',
//     topic: '',
//
// };

export default Post;