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
        console.log(posts);
        return (
            <div className="col-9">
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