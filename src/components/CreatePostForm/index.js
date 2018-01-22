import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import randomString from 'random-string';
import './index.css';
import { db, uploadImg } from '../../utils';

const errorMessage = 'ERROR';

export class CreatePostForm extends Component {
    state = {
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

    handleOnChangeTextInput = (event, field) => this.setState({ post: { [field]: event.target.value } });

    handleOnUploadImg = value => {
        value.preventDefault();
        const post = { ...this.state.post };
        const picture = uploadImg(this.fileInput.files[0])
        post.pictures.push(picture);
        this.setState({ post });
        console.log(picture)
    };

    handleAddUrl = (event, field) => {
        const urls = this.state.post[field];
        urls.push(event.target.value);
        this.setState({ post: { [field]: urls } });
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
                return this.setState({ post: clearPost })
            })
            .catch(() => this.setState({ error: true }));
    };

    render() {
        const { post: { title, body, coubs, pictures, videos, author } } = this.state;
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
                                        onChange={event => this.handleOnChangeTextInput(event, 'name')}
                                    />
                                </li>
                                <li className="form__li">
                                    <input
                                        placeholder="Title"
                                        className="form__input"
                                        id="caption"
                                        type="text"
                                        name="caption"
                                        onChange={event => this.handleOnChangeTextInput(event, 'caption')}
                                    />
                                </li>
                                <li className="form__li">
                                    <ul className="form-bt">
                                        <li className="form-bt__li">
                                            <button className="form-bt__bt form-bt__bt--img">Add image</button>
                                        </li>
                                        <li className="form-bt__li">
                                            <button className="form-bt__bt form-bt__bt--youtube">Add video</button>
                                        </li>
                                        <li className="form-bt__li">
                                            <button className="form-bt__bt form-bt__bt--coub">Add coub</button>
                                        </li>
                                    </ul>
                                </li>
                                <li className="form__li">
                                    <textarea
                                        placeholder="Description"
                                        className="form__textarea"
                                        name="body"
                                        id="body"
                                        rows="3"
                                        onChange={event => this.handleOnChangeTextInput(event, 'body')}
                                    />
                                </li>
                                <li className="form__li">
                                    <input
                                        type="submit"
                                        value="Create Post"
                                        className="form__button-add-post"
                                    />
                                </li>
                            </ul>
                            <input
                                type="file"
                                name="pic"
                                accept="image/*"
                                onChange={this.handleOnUploadImg}
                                ref={input => {
                                    this.fileInput = input;
                                }}
                            />
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
};