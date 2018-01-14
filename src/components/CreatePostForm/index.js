import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.css';

export class CreatePostForm extends Component {
    render() {
        return (
            <h1>Create Post</h1>
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