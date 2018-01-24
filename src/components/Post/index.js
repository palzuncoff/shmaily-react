import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import './index.css';

const youTube = 'https://www.youtube.com/embed/';

export class Post extends Component {
    state = {
        areCommentsOpen: false,
    };

    handleOpenComments = () => this.setState({ areCommentsOpen: !this.state.areCommentsOpen });

    handleNewComment(comment) {
        console.log(comment.text);
    }

    renderPictures = picture => <div key={picture.name}><img src={picture.url} alt="ERROR"/></div>;

    renderCoub = coub => {
        const id = coub.split('/').reverse()[0];
        return (
            <div key={id}>
                <iframe
                    title={`coub_${id}`}
                    src={`//coub.com/embed/${id}?muted=false&autostart=false&originalSize=false&startWithHD=false`}
                    allowFullScreen
                    frameBorder="0"
                    width="640"
                    height="264"
                />
            </div>
        );
    };

    renderVideo = video => {
        const isYouTube = video.includes('youtube.com');
        const id = video.split('=').reverse()[0];
        return (
            <div key={id}>
                {isYouTube ? <iframe
                    title={`video_${id}`}
                    width="560"
                    height="315"
                    frameBorder="0"
                    allowFullScreen
                    allow="encrypted-media"
                    src={`${youTube}${id}`}
                /> : <h1>YouTube Only!</h1>}
            </div>
        );
    };

    render() {
        const { author, body, coubs, date, id, title, pictures, videos } = this.props;
        const { areCommentsOpen } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <h3>{author}</h3>
                <h6>{date}</h6>
                {pictures.map(this.renderPictures)}
                {coubs.map(this.renderCoub)}
                {videos.map(this.renderVideo)}
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