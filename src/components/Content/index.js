import React, { Component } from 'react';
import './index.css';
import { Post } from '../Post';
import { getPostList } from '../../utils';

export class Content extends Component {
    state = {
        posts: [],
    };

    componentWillMount(){
        getPostList.on('child_added', snapshot => {
            const post = {
                id: snapshot.key,
                ...snapshot.val(),
            };
            this.setState({ posts: [post].concat(this.state.posts) });
        });
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="col-9">
                {posts.map(post => <Post
                    author={post.author || 'Shmailer'}
                    body={post.body}
                    coubs={post.coubs}
                    date={post.date}
                    id={post.id}
                    key={post.id}
                    pictures={post.pictures}
                    title={post.title || 'Post-Shmost'}
                    topic={post.topic}
                    videos={post.videos}
                />)}
            </div>
        );
    }
};