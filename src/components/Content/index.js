import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './index.css';
import { Post } from '../Post';
import { getPostList, paginatePostList } from '../../utils';

export class Content extends Component {
    state = {
        posts: [],
        last: null,
        empty: false,
        error: false,
    };

    componentWillMount(){
        console.log('Start')
        return getPostList.get()
            .then(snapshots => {
                const lastOne = snapshots.docs[snapshots.docs.length-1]
                this.setState({ last: lastOne.data().createdAt});
                return snapshots.forEach(doc => {
                    const post = {
                        id: doc.id,
                        ...doc.data()
                    };
                    console.log('finish')
                    this.setState({ posts: [post].concat(this.state.posts) });
                })

            })
            .catch(error => {
                if (error.message === 'lastOne is undefined') {
                    return this.setState({ empty: true });
                }
                return this.setState({ error: true })
            })
    };

    handleLoadMore = () => {
        const { last, empty, posts } = this.state;
        if (posts.length > 9 && !empty) {
            return paginatePostList(last).get()
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
        return null;
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