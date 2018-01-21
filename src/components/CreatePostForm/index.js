import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.css';

export class CreatePostForm extends Component {
    state = {
        showModal: false,
        listInputs: [
            {
                i: 1,
                btAdd: '+',
                placeholder: 'YouTube',
                type: 'text',
                name: 'video',
                id: 'video',
                btDelete: 'x'
            },
            {
                i: 2,
                btAdd: '+',
                placeholder: 'Coub',
                type: 'text',
                name: 'coub',
                id: 'coub',
                btDelete: 'x'
            }
        ],
        listItems: [
            {
                i: 1,
                title: 'Lorem ipsum.',
                btDelete: 'x',
                icon: 'items__icon items__icon--img',
            },
            {
                i: 2,
                title: 'Lorem.',
                btDelete: 'x',
                icon: 'items__icon items__icon--img',
            },
            {
                i: 3,
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, in, iusto.',
                btDelete: 'x',
                icon: 'items__icon items__icon--img',
            },
            {
                i: 4,
                title: 'https://www.youtube.com/watch?v=eTFy8RnUkoU',
                btDelete: 'x',
                icon: 'items__icon items__icon--youtube',
            },
            {
                i: 5,
                title: 'https://www.youtube.com/watch?v=8NQ-Bk63Hs8&list=RDMM8NQ-Bk63Hs8.',
                btDelete: 'x',
                icon: 'items__icon items__icon--youtube',
            },
            {
                i: 6,
                title: 'http://coub.com/view/112jn8',
                btDelete: 'x',
                icon: 'items__icon items__icon--coub',
            },
            {
                i: 7,
                title: 'http://coub.com/view/10uoin',
                btDelete: 'x',
                icon: 'items__icon items__icon--coub',
            }
        ]
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
                                    <ul className="list-inputs">
                                        {this.state.listInputs.map(input =>
                                            <li className="list-input__li" key={input.i}>
                                                <button className="form__input--add">{input.btAdd}</button>
                                                <input
                                                    placeholder={input.placeholder}
                                                    className="form__input form__input--youtube"
                                                    type={input.type}
                                                    name={input.name}
                                                    id={input.id}
                                                    onChange={event => this.handleOnChangeTextInput(event, 'video')}
                                                />
                                                <button className="form__input--delete">{input.btDelete}</button>
                                            </li>
                                        )}
                                    </ul>
                                    <ul className="list-items">
                                        {this.state.listItems.map(item =>
                                            <li className="items__li" key={item.i}>
                                                <div className="items__item">
                                                    <span className={item.icon}>&nbsp;</span>
                                                    <p className="items__title">{item.title}</p>
                                                    <button className="items__delete">{item.btDelete}</button>
                                                </div>
                                            </li>
                                        )}
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