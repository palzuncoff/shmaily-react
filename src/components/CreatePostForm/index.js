import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import randomString from 'random-string';
import './index.css';
import { db } from '../../utils';

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
        console.log({ picture: this.fileInput.files[0].name})
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
                <button onClick={this.handleShow}>Show Create Post Form</button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="">
                            <ul className="form-style-1">
                                <li>
                                    <label htmlFor="caption">Title</label>
                                    <input
                                        className="field-long"
                                        id="caption"
                                        type="text"
                                        name="caption"
                                        value={title}
                                        onChange={event => this.handleOnChangeTextInput(event, 'title')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="picture">Pictures</label>
                                    <input
                                        name="picture"
                                        id="picture"
                                        type="file"
                                        className="field-img"
                                        value={pictures}
                                        onChange={this.handleOnUploadImg}
                                        ref={input => {
                                            this.fileInput = input;
                                        }}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="body">Body</label>
                                    <textarea
                                        className="field-long field-textarea"
                                        name="body"
                                        id="body"
                                        cols="30"
                                        rows="10"
                                        value={body}
                                        onChange={event => this.handleOnChangeTextInput(event, 'body')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="video">Links for Video</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        name="video"
                                        id="video"
                                        value={videos}
                                        onChange={event => this.handleAddUrl(event, 'video')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="coub">Links for Coub</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        id="coub"
                                        name="coub"
                                        value={coubs}
                                        onChange={event => this.handleAddUrl(event, 'coub')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="coub">Author</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={author}
                                        onChange={event => this.handleOnChangeTextInput(event, 'author')}
                                    />
                                </li>
                                <li>
                                    <input type="submit" value="ADD" onClick={this.handleOnSubmit}/>
                                </li>
                            </ul>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
};