import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import { Modal, Button } from 'react-bootstrap';
import './index.css';
import { PostModel, fire } from '../../utils';

export class CreatePostForm extends Component {
    state = {
        post: {
            title: null,
            pictures: [],
            body: null,
            coubs: [],
            videos: [],
            author: null,
            date: new Date().toDateString(),
        },
        showModal: false,
    };

    handleShow = () => this.setState({ showModal: true });

    handleClose = () => this.setState({ showModal: false });

    handleOnChangeTextInput = (event, field) => this.setState({ [field]: event.target.value});

    handleOnUploadImg = value => {
        value.preventDefault();
        console.log({ picture: this.fileInput.files[0].name})
    };

    handleOnSubmit = (e) => {
        const { post } = this.state;
        e.preventDefault();
        return fire.database().ref('posts/').push({
            ...post,
        });
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
                                        onChange={event => this.handleOnChangeTextInput(event, 'caption')}
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
                                        onChange={event => this.handleOnChangeTextInput(event, 'video')}
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
                                        onChange={event => this.handleOnChangeTextInput(event, 'coub')}
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
                                        onChange={event => this.handleOnChangeTextInput(event, 'name')}
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

CreatePostForm.propTypes = {
    show: PropTypes.bool,
};

CreatePostForm.defaultProps = {
    show: false,
};

export default CreatePostForm;