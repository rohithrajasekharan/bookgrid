import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
    <div className="form-group">
        <label>Content</label>
        <div>
            <textarea className="form-control" {...input} placeholder="Content" rows="10" cols="40"/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
      };
      onSubmit(props){
        this.props.createPost(props)
        .then(() => { this.context.router.history.push('/posts'); })
      }
    render() {
        const { handleSubmit, title, categories, content } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field name="title" component={renderInput} label="Title" type="text" {...title} />
                <Field name="categories" component={renderInput} label="Categories" type="text" {...categories} />
                <Field name="content" component={renderTextArea} {...content} />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/posts" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required';
    }
    if (!values.categories) {
        errors.categories = 'Required';
    }
    if (!values.content) {
        errors.content = 'Content cannot be empty';
    } else if (values.content.length < 3) {
        errors.content = 'Content should be more than 3 characters';
    }

    return errors;
}

export default connect(null, {createPost})(reduxForm({
    form: 'PostsNew',
    validate
})(PostsNew));