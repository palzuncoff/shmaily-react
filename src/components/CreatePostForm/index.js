import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import './index.css';

export class CreatePostForm extends Component {
    state = {
        caption: '',
        picture: '',
        body: '',
        coub: '',
        video: '',
        name: '',
        showModal: false,
    };

    handleShow = () => this.setState({ showModal: true });

    handleClose = () => this.setState({ showModal: false });

    handleOnChangeTextInput = (event, field) => this.setState({ [field]: event.target.value});

    handleOnUploadImg = value => {
        value.preventDefault();
        console.log({ picture: this.fileInput.files[0].name})
    };

    render() {
        const { caption, picture, body, coub, video, name } = this.state;
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Show Create Post Form
                </Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="">
                            <ul className="form-style-1">
                                <li>
                                    <label htmlFor="caption">Caption</label>
                                    <input
                                        className="field-long"
                                        id="caption"
                                        type="text"
                                        name="caption"
                                        value={caption}
                                        onChange={event => this.handleOnChangeTextInput(event, 'caption')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="picture">Picture</label>
                                    <input
                                        name="picture"
                                        id="picture"
                                        type="file"
                                        className="field-img"
                                        value={picture}
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
                                    <label htmlFor="video">Link for Video</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        name="video"
                                        id="video"
                                        value={video}
                                        onChange={event => this.handleOnChangeTextInput(event, 'video')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="coub">Link for Coub</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        id="coub"
                                        name="coub"
                                        value={coub}
                                        onChange={event => this.handleOnChangeTextInput(event, 'coub')}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="coub">Name</label>
                                    <input
                                        className="field-long"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={event => this.handleOnChangeTextInput(event, 'name')}
                                    />
                                </li>
                                <li>
                                    <input type="submit" value="ADD" onClick={(console.log('OK'))}/>
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