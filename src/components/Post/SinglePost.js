import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './';
import { getPost } from '../../utils';

class SinglePost extends Component {
    state = {
        post: {},
        error: false,
    };

    componentWillMount() {
        getPost(this.props.match.params.id).get()
            .then(doc => {
                if (doc.exists) {
                    const post = {
                        id: doc.id,
                        ...doc.data()
                    };
                    this.setState({ post })
                } else {
                    this.setState({ error: true })
                }
            })
            .catch(err => this.setState({ error: true }))
    }

    render() {
        const { post, error } = this.state;
        return (
            <div>
                {error ? <h1>404 NOT FOUND</h1> : <Post
                    author={post.author || 'Shmayler'}
                    body={post.body}
                    coubs={post.coubs}
                    date={post.date}
                    id={post.id}
                    title={post.title || 'Post-Shmost'}
                    pictures={post.pictures}
                    videos={post.videos}
                />}
            </div>
        );
    }
};

SinglePost.propTypes = {
    match: PropTypes.object.isRequired,
};

export default SinglePost;