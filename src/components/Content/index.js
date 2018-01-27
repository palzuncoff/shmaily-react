import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css';
import Post from '../Post';
import { paginatePostList, getStart } from '../../utils';

export class Content extends Component {
    state = {
        posts: [],
        last: null,
        empty: false,
        error: false,
    };

    componentWillMount(){
        getStart.get()
            .then(snapshots => {
                snapshots.forEach(doc => {
                    const post = {
                        id: doc.id,
                        ...doc.data()
                    };
                    this.setState({ posts: [post],  last: post.createdAt });
                });
            })
            .then(() => paginatePostList(this.state.last).get()
                .then(snapshots => {
                    const lastOne = snapshots.docs[snapshots.docs.length - 1];
                    const nextPosts = [];
                    snapshots.forEach(doc => {
                        nextPosts.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    this.setState({
                        posts: [...this.state.posts, ...nextPosts],
                        last: lastOne.data().createdAt,
                    })
                })
                .catch(error => {
                    if (error.message === 'lastOne is undefined') {
                        this.setState({ empty: true });
                    }
                    this.setState({ error: true })
                }))
            .catch(error => {
                if (error.message === 'lastOne is undefined') {
                    this.setState({ empty: true });
                }
                this.setState({ error: true })
            });
    };

    handleLoadMore = () => {
        const { last, empty, posts } = this.state;
        if (posts.length > 10 && !empty) {
            paginatePostList(last).get()
                .then(snapshots => {
                    const lastOne = snapshots.docs[snapshots.docs.length - 1];
                    const nextPosts = [];
                    snapshots.forEach(doc => {
                        nextPosts.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    this.setState({
                        posts: [...posts, ...nextPosts],
                        last: lastOne.data().createdAt,
                    })
                })
                .catch(error => {
                    if (error.message === 'lastOne is undefined') {
                        return this.setState({ empty: true });
                    }
                    this.setState({ error: true })
                })
        }
    };

    render() {
        const { posts } = this.state;
        return (

            <div className="col-9">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore
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

export default Content;