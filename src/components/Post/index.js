import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import Iframe from 'react-iframe'
import './index.css';

const youTube = 'https://www.youtube.com/embed/';

export class Post extends Component {
    state = {
        areCommentsOpen: false,
    };

    handleOpenComments = () => this.setState({ areCommentsOpen: !this.state.areCommentsOpen });

    renderPictures = picture => (
        <div
            key={picture.name}
            className="post-picture"
        >
            <img src={picture.url} alt="ERROR"/>
        </div>
    );

    renderCoub = coub => {
        const isCoub = coub.includes('coub.com');
        const id = coub.split('/').reverse()[0];
        return (
            <div key={id} className="post-coub">
                {isCoub ? <Iframe
                    url={`//coub.com/embed/${id}`}
                    width="480px"
                    height="480px"
                    position="relative"
                    allowFullScreen
                /> : <h1>Coub Only!</h1>}
            </div>
        );
    };

    renderVideo = video => {
        const isYouTube = video.includes('youtube.com');
        const id = video.split('=').reverse()[0];
        return (
            <div key={id} className="post-video">
                {isYouTube ?
                    <Iframe
                        url={`${youTube}${id}`}
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