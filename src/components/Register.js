import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../actions/index';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <div>
      <TextField {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    </div>
  </div>
);//custom component for input fields to sort errors


class Register extends Component {
  state = {
  email: '',
  password: '',
  name: '',
  showMyComponent: false
  };


  handleNameChange = (value) => this.setState({name:value});//name to input value
  handleEmailChange = (value) => this.setState({email: value});//mail to input value
  handlePasswordChange = (value) => this.setState({password: value});//password to input value

//pass control of context router
    static contextTypes = {
        router: PropTypes.object
      };
      onSubmit(props){
        this.setState({showMyComponent: true})
        const data = {
          email: this.state.email,
          name: this.state.name,
          password: this.state.password
        }//submit state to action creator and take to home page
    this.props.createUser(data).then((data) => { if(data.error){ this.setState({error: "Email already exists",showMyComponent: false}) } })

      }
    render() {

        const { handleSubmit } = this.props;
        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <h2>BOOKGRID</h2><br/><br/>
              <Field name="name" component={renderInput} label="Name" type="text" onChange={event => this.handleNameChange(event.target.value)} />
              <Field name="email" component={renderInput} label="Email" type="text" onChange={event => this.handleEmailChange(event.target.value)} />
              <Field name="password" component={renderInput} label="password" type="password" onChange={event => this.handlePasswordChange(event.target.value)} />
              <Field name="repassword" component={renderInput} label="Retype Password" type="password" />
              { this.state.showMyComponent ? <CircularProgress className="error"/> : <span className="error">{this.state.error}</span> }
              <br/><br/>
  <RaisedButton type="submit" primary={true} label="Sign up" /><br/><br/><br/>

  </form>

        );
    }
}

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Type a valid email address';
    }
    if (!values.password) {
        errors.password = 'Content cannot be empty';
      }
      if (values.password && values.password.length<6) {
          errors.password = 'Password should be atleast 6 characters';
        }
    if (!values.repassword) {
            errors.repassword = 'Content cannot be empty';
    }
    else if (values.repassword!==values.password) {
      errors.repassword = 'password should match'
    }

    return errors;
} //form validation

export default connect(null, {createUser })(reduxForm({
    form: 'Register',
    validate
})(Register));
