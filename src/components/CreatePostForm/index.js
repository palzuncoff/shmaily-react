import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.css';

export class CreatePostForm extends Component {
    state = {
        caption: '',
        picture: null,
        body: '',
        coub: '',
        video: '',
    };
    handleCloseModal = () => {
        this.props.hideModal();
    };

    handleOnChangeTextInput = (event, field) => this.setState({ [field]: event.target.value});

    handleOnUploadImg = value => {
        value.preventDefault();
        console.log({ picture: this.fileInput.files[0].name})
    };

    render() {
        const { caption, picture, body, coub, video } = this.state;
        return (
            <div>
                <h1>Create Post</h1>
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
                            <input type="submit" value="ADD" onClick={(console.log('OK'))}/>
                        </li>
                    </ul>
                </form>
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