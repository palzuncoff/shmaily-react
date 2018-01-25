import Textarea  from 'react-textarea-autosize';
import React, { Component } from 'react';
import Rodal from 'rodal';
import randomString from 'random-string';
import 'rodal/lib/rodal.css';
import './index.css';
import photo from '../../img/icon-image.svg';
import { db, uploadImg, removePictures } from '../../utils';

const clearPost = {
    title: '',
    pictures: [],
    body: '',
    coubs: [],
    videos: [],
    author: '',
    date: new Date().toDateString(),
};

const emptyPost = {
    title: '',
    pictures: [],
    body: '',
    coubs: [],
    videos: [],
    author: '',
};

export class CreatePostForm extends Component {
    state = {
        currentInput: '',
        currentCoub: '',
        currentVideo: '',
        disableSubmit: true,
        picturesPreview: [],
        post: {
            title: '',
            pictures: [],
            body: '',
            coubs: [],
            videos: [],
            author: '',
            date: new Date().toDateString(),
        },
        showUrlInput: false,
        showModal: false,
        error: false,
    };

    componentWillUnmount() {
        return removePictures(this.state.post.pictures)
            .then(() => this.setState({ post: clearPost, picturesPreview: [], showModal: false }))
            .catch(() => this.setState({ error: true }));
    };

    handleShow = () => this.setState({ showModal: true });

    handleClose = () => removePictures(this.state.picturesPreview)
        .then(() => this.setState({
            post: clearPost,
            picturesPreview: [],
            showModal: false,
            showUrlInput: false
        }))
        .catch(() => this.setState({ error: true }));

    handleOnChangeTextInput = (event, field) => {
        const post = { ...this.state.post };
        post[field] = event.target.value;
        this.setState({ post, disableSubmit: false });
    };

    handleOnUploadImg = value => {
        value.preventDefault();
        if (this.fileInput.files.length > 0) {
            this.setState({disableSubmit: true});
            const file = this.fileInput.files[0];
            const post = { ...this.state.post };
            const solt = randomString();
            const pictureName = `${solt}-${file.name}`;
            const picturesPreview = [ ...this.state.picturesPreview ];
            picturesPreview.push(pictureName);
            this.setState({ picturesPreview });
            return uploadImg(file, pictureName)
                .then(snapshot => {
                    post.pictures.push({ url: snapshot.downloadURL, name: pictureName });
                    return this.setState({ post });
                })
                .then(() => this.setState({disableSubmit: false}))
                .catch(() => this.setState({ error: true }));
        }
        return null;
    };

    handleRemovePicture = picture => removePictures([picture])
        .then(() => {
            const post = { ...this.state.post };
            const pictures = post.pictures.filter(pic => pic.name !== picture);
            post.pictures = pictures;

            return this.setState({ post });
        })
        .then(() => {
            const picturesPreview = this.state.picturesPreview.filter(pic => pic !== picture);

            return this.setState({ picturesPreview });
        })
        .catch(() => this.setState({ error: true }));

    handleShowUrlInput = currentInput => {
        const { showUrlInput } = this.state;
        return this.setState({ showUrlInput: !showUrlInput, currentInput })
    };

    handleClearUrlInput = currentInput => this.setState({  showUrlInput: false, [currentInput]: '' });

    handleUrlInput = (event, type) => this.setState({
        [type]:  event.target.value,
        disableSubmit: false,
    });

    hangleAddUrl = type => {
        const post = { ...this.state.post };
        switch (type) {
            case 'currentCoub':
                post.coubs.push(this.state[type]);
                break;

            case 'currentVideo':
                post.videos.push(this.state[type]);
                break;

            default:
                return this.setState({ error: true })
        }

        return this.setState({ post, [type]: '', showUrlInput: false })
    };

    handleOnSubmit = e => {
        e.preventDefault();
        const post = { ...this.state.post };
        return db.push({ ...post })
            .then(() => this.setState({ post: clearPost, picturesPreview: [] }))
            .then(() => this.setState({ disableSubmit: true }))
            .catch(() => this.setState({ error: true }));
    };

    renderUplodedPictures = picture => (
        <div key={picture.name} className="img-preview">
            <button
                className="img-preview__delete"
                type="button"
                onClick={() => this.handleRemovePicture(picture.name)}
            >&#10005;</button>
            <img src={picture.url} alt={`Baz taking a ${photo}`} className="img-preview__img"/>
        </div>
    );

    renderInput = () => {
        const { currentInput } = this.state;
        return (
            <div className="list-input">
                <button
                    className="form__input--add"
                    type="button"
                    onClick={() => this.hangleAddUrl(currentInput)}
                >+</button>
                <input
                    placeholder="add"
                    className="form__input"
                    type="text"
                    value={this.state[currentInput]}
                    onChange={event => this.handleUrlInput(event, currentInput)}
                />
                <button
                    className="form__input--delete"
                    type="button"
                    onClick={() => this.handleClearUrlInput(currentInput)}
                >x</button>
            </div>
        );
    };

    render() {
        const {
            disableSubmit,
            showUrlInput,
            post: { title, body, coubs, videos, author, pictures },
            showModal
        } = this.state;
        const control = JSON.stringify({
            title,
            pictures,
            body,
            coubs,
            videos,
            author,
        }) === JSON.stringify(emptyPost);
        return (
            <div>
                <button onClick={this.handleShow}>Create Post</button>
                <Rodal visible={showModal} width={700} onClose={this.handleClose}>
                    <form action="" className="form">
                        <ul className="form__list">
                            <li className="form__li">
                                <input
                                    placeholder="Name"
                                    className="form__input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={author}
                                    onChange={event => this.handleOnChangeTextInput(event, 'author')}
                                />
                            </li>
                            <li className="form__li">
                                <input
                                    placeholder="Title"
                                    className="form__input"
                                    id="caption"
                                    type="text"
                                    name="caption"
                                    value={title}
                                    onChange={event => this.handleOnChangeTextInput(event, 'title')}
                                />
                            </li>
                            <li className="form__li">

                                {/* Buttons */}
                                <ul className="form-bt">
                                    <li className="form-bt__li">
                                        <label htmlFor="add-picture" className="form-bt__bt form-bt__bt--img">
                                            Add picture
                                            <input
                                                className="form-bt__file-upload"
                                                type="file"
                                                id="add-picture"
                                                name="pic"
                                                accept="image/*"
                                                onChange={this.handleOnUploadImg}
                                                ref={input => {
                                                    this.fileInput = input;
                                                }}
                                            />
                                        </label>
                                    </li>
                                    <li className="form-bt__li">
                                        <button
                                            type="button"
                                            className="form-bt__bt form-bt__bt--youtube"
                                            onClick={() => this.handleShowUrlInput('currentVideo')}
                                        >Add video</button>
                                    </li>
                                    <li className="form-bt__li">
                                        <button
                                            className="form-bt__bt form-bt__bt--coub"
                                            type="button"
                                            onClick={() => this.handleShowUrlInput('currentCoub')}
                                        >Add coub</button>
                                    </li>
                                </ul>

                                {/* Add Input */}
                                {showUrlInput && this.renderInput()}
                                {/* List Items */}
                                <ul className="list-items">
                                    {videos.map((video) => (
                                        <li className="items__li" key={video.toString()}>
                                            <div className="items__item">
                                                <span className="items__icon items__icon--youtube">&nbsp;</span>
                                                <p className="items__title">{video}</p>
                                                <button className="items__delete">x</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="list-items">
                                    {coubs.map((coub) => (
                                        <li className="items__li" key={coub.toString()}>
                                            <div className="items__item">
                                                <span className="items__icon items__icon--coub">&nbsp;</span>
                                                <p className="items__title">{coub}</p>
                                                <button className="items__delete">x</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="form__li">
                                <div className="list-preview">
                                    {pictures.map(this.renderUplodedPictures)}
                                </div>
                            </li>
                            <li className="form__li">
                                <Textarea
                                    minRows={5}
                                    placeholder="Text"
                                    className="form__textarea"
                                    name="body"
                                    id="body"
                                    rows="5"
                                    value={body}
                                    onChange={event => this.handleOnChangeTextInput(event, 'body')}
                                />
                            </li>
                            <li className="form__li">
                                <input
                                    type="submit"
                                    value="Create Post"
                                    className="form__button-add-post"
                                    onClick={this.handleOnSubmit}
                                    disabled={control || disableSubmit}
                                />
                            </li>
                        </ul>
                    </form>
                </Rodal>
            </div>
        );
    };
};