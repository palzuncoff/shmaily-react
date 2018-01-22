import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './index.css';
import { db, uploadImg } from '../../utils';

const errorMessage = 'ERROR';

export class CreatePostForm extends Component {
    state = {
        picturesPreview: [],
        showUrlInput: false,
        currentInput: '',
        currentCoub: '',
        currentVideo: '',
        post: {
            title: '',
            pictures: [],
            body: '',
            coubs: [],
            videos: [],
            author: '',
            date: new Date().toDateString(),
        },
        showModal: false,
        error: false,
    };

    handleShow = () => this.setState({ showModal: true });

    handleClose = () => this.setState({ showModal: false });

    handleOnChangeTextInput = (event, field) => {
        const post = { ...this.state.post };
        post[field] = event.target.value;
        this.setState({ post });
    };

    handleOnUploadImg = value => {
        value.preventDefault();
        const post = { ...this.state.post };
        const file = this.fileInput.files[0];
        const picturesPreview = [ ...this.state.picturesPreview ];
        picturesPreview.push(file.name);
        this.setState({ picturesPreview });
        return uploadImg(file)
            .then(snapshot => post.pictures.push(snapshot.downloadURL))
            .catch(() => this.setState({ error: true }));
    };

    handleShowUrlInput = currentInput => {
        const { showUrlInput } = this.state;
        return this.setState({ showUrlInput: !showUrlInput, currentInput })
    };

    handleClearUrlInput = currentInput => this.setState({  showUrlInput: false, [currentInput]: '' });

    handleUrlInput = (event, type) => {
        this.setState({ [type]:  event.target.value });
    };

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
        return this.setState({ post, [type]: '' })
    };

    handleOnSubmit = (e) => {
        const { post } = this.state;
        e.preventDefault();
        return db.push({ ...post })
            .then(() => {
                const clearPost = {
                    title: '',
                    pictures: [],
                    body: '',
                    coubs: [],
                    videos: [],
                    author: '',
                    date: new Date().toDateString(),
                    sistemDate: new Date(),
                };
                return this.setState({ post: clearPost, picturesPreview: [] })
            })
            .catch(() => this.setState({ error: true }));
    };

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
        const { showUrlInput, picturesPreview, post: { title, body, coubs, videos, author } } = this.state;
        return (
            <div>
                <button onClick={this.handleShow}>Create Post</button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="" className="form">
                            <ul className="form__list">
                                <li className="form__li">
                                    <input
                                        placeholder="Your Name"
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
                                            <input
                                                className="form-bt__bt form-bt__bt--img"
                                                type="file"
                                                name="pic"
                                                accept="image/*"
                                                onChange={this.handleOnUploadImg}
                                                ref={input => {
                                                    this.fileInput = input;
                                                }}
                                            />
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
                                        {picturesPreview.map(piture => (
                                            <li className="items__li">
                                                <div className="items__item">
                                                    <span className="items__icon items__icon--img">&nbsp;</span>
                                                    <p className="items__title">{piture}</p>
                                                    <button className="items__delete">x</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="list-items">
                                        {videos.map(video => (
                                            <li className="items__li">
                                                <div className="items__item">
                                                    <span className="items__icon items__icon--youtube">&nbsp;</span>
                                                    <p className="items__title">{video}</p>
                                                    <button className="items__delete">x</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="list-items">
                                        {coubs.map(coub => (
                                            <li className="items__li">
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
                                    <textarea
                                        placeholder="Description"
                                        className="form__textarea"
                                        name="body"
                                        id="body"
                                        rows="3"
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
                                    />
                                </li>
                            </ul>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};