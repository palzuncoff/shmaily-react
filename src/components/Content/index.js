import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css';
import { Post } from '../Post';
import { getPostList, paginatePostList } from '../../utils';

export class Content extends Component {
    state = {
        posts: [],
        error: false,
    };

    componentWillMount(){
        return getPostList.get()
            .then(snapshots => {
                snapshots.forEach(doc => {
                    const post = {
                        id: doc.id,
                        ...doc.data()
                    };
                    this.setState({ posts: [post].concat(this.state.posts) });
                })

            })
            .catch(error => console.log("Error getting documents: ", error))
    };

    handleLoadMore = lastPost => {
        paginatePostList(lastPost).on('child_added', snapshot => {
            const post = {
                id: snapshot.key,
                ...snapshot.val(),
            };
            return this.setState({ posts: [post].concat(this.state.posts) });
        });
    };

    render() {
        const { posts } = this.state;
        return (

            <div className="col-9">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {}}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
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
                </InfiniteScroll>
            </div>
        );
    }
};