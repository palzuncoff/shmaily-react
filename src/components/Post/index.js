import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import Iframe from 'react-iframe'
import './index.css';
import { COUB_URL, YOUTUBE_URL } from '../../constants/index';

export class Post extends Component {
    state = {
        areCommentsOpen: false,
    };

    handleClick(event) {
        const el = event.target;
        el.classList.toggle('img-size');
    }

    handleOpenComments = () => this.setState({ areCommentsOpen: !this.state.areCommentsOpen });

    renderPictures = picture => (
        <div
            key={picture.name}
            className="post-picture"
        >
            <img src={picture.url} alt="ERROR" onClick={this.handleClick} />
        </div>
    );

    renderCoub = (coub, index) => {
        const isCoub = coub.includes(COUB_URL.ROOT);
        const id = coub.split('/').reverse()[0];
        return (
            <div key={`${index}-${id}`} className="post-coub">
                {isCoub ? <Iframe
                    url={`${COUB_URL.EMBED}${id}`}
                    width="480px"
                    height="480px"
                    position="relative"
                    allowFullScreen
                /> : <h1>Coub Only!</h1>}
            </div>
        );
    };

    renderVideo = (video, index) => {
        const isYouTube = video.includes(YOUTUBE_URL.ROOT);
        const id = video.split('=').reverse()[0];
        return (
            <div key={`${index}-${id}`} className="post-video">
                {isYouTube ?
                    <Iframe
                        url={`${YOUTUBE_URL.EMBED}${id}`}
                        width="640px"
                        height="400px"
                        position="relative"
                        allowFullScreen
                    />
                    : <h1>YouTube Only!</h1>}
            </div>
        );
    };

    render() {
        const { author, body, coubs, date, id, title, pictures, videos } = this.props;
        const { areCommentsOpen } = this.state;
        return (
            <div className="cf">
                <h2 className="post-title">{title}</h2>
                <div className="post-info">
                    <h3 className="post-info__author">{author}</h3>
                    <p className="post-info__date">{date}</p>
                </div>
                {pictures.map(this.renderPictures)}
                {coubs.map(this.renderCoub)}
                {videos.map(this.renderVideo)}
                {body && <div className="post-description">{body}</div>}
                <input
                    className="post-comments-bt"
                    type="button"
                    value={areCommentsOpen ? 'Hide comments' : 'Show comments'}
                    onClick={this.handleOpenComments}
                />
                {areCommentsOpen && <ReactDisqusComments
                    shortname={process.env.REACT_APP_SHORT_NAME}
                    identifier={id}
                    title={title || 'Shmaily-post'}
                    url={`${process.env.REACT_APP_ROOT_URL}/${id}`}
                    category_id={process.env.REACT_APP_CATEGORY_ID}
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