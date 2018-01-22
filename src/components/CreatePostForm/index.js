import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.css';

const mocPictures = [
  'img name',
  'img name lorem ipsum.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, in, iusto.'
];
const mocVideo = [
  'https://www.youtube.com/watch?v=eTFy8RnUkoU', 'https://www.youtube.com/watch?v=8NQ-Bk63Hs8&list=RDMM8NQ-Bk63Hs8'
];
const mocCoub = [
  'http://coub.com/view/112jn8',
  'http://coub.com/view/10uoin'
];

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
    };

    handleShow = () => this.setState({ showModal: true });

    handleClose = () => this.setState({ showModal: false });

    handleOnChangeTextInput = (event, field) => this.setState({ [field]: event.target.value});

    handleOnUploadImg = value => {
        value.preventDefault();
        console.log({ picture: this.fileInput.files[0].name})
    };

    render() {
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

                                    {/* Buttons */}
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

                                    {/* Add Inputs */}
                                    <div className="list-input">
                                        <button className="form__input--add">+</button>
                                        <input
                                            placeholder="add"
                                            className="form__input"
                                            type="text"
                                            name="name"
                                            id="testId"
                                            onChange={event => this.handleOnChangeTextInput(event, 'video')}
                                        />
                                        <button className="form__input--delete">x</button>
                                    </div>

                                    {/* List Items */}
                                    <ul className="list-items">
                                      {mocPictures.map(pitures => (
                                        <li className="items__li">
                                            <div className="items__item">
                                                <span className="items__icon items__icon--img">&nbsp;</span>
                                                <p className="items__title">{pitures}</p>
                                                <button className="items__delete">x</button>
                                            </div>
                                        </li>
                                      ))}
                                      {mocVideo.map(videos => (
                                        <li className="items__li">
                                            <div className="items__item">
                                                <span className="items__icon items__icon--youtube">&nbsp;</span>
                                                <p className="items__title">{videos}</p>
                                                <button className="items__delete">x</button>
                                            </div>
                                        </li>
                                      ))}
                                      {mocCoub.map(coubs => (
                                        <li className="items__li">
                                            <div className="items__item">
                                                <span className="items__icon items__icon--coub">&nbsp;</span>
                                                <p className="items__title">{coubs}</p>
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
                        </form>
                    </Modal.Body>
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
