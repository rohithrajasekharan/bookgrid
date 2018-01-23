import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { loginUser, fetchFacebookUser, fetchGoogleUser } from '../actions/index';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons';
const style = {
  width:'15em',
  marginLeft:14,
  marginRight:14,
  fontSize: 14
};
const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <div>
      <TextField {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    </div>
  </div>
);


class Authenticate extends Component {

  state = {
    loginmail: '',
    loginpassword: '',
    error: '',
    showMyComponent: false
  };
fetchFacebookUser = () => {
  this.setState({showMyComponent: true})
  this.props.fetchFacebookUser().then((data) => {if(data.error){ this.setState({error: "Invalid Email or Password",showMyComponent: false}) }else{ this.context.router.history.push('/');} })
    }
fetchGoogleUser = () => {
  this.setState({showMyComponent: true})
  this.props.fetchGoogleUser().then((data) => {if(data.error){ this.setState({error: "Invalid Email or Password",showMyComponent: false}) }else{ this.context.router.history.push('/');} })
    }

  handleLoginEmailChange = (value) => this.setState({loginmail: value});
  handleLoginPasswordChange = (value) => this.setState({loginpassword: value});

    static contextTypes = {
        router: PropTypes.object
      };
      onSubmit(props){
        this.setState({showMyComponent: true})
        const data = {
          email: this.state.loginmail,
          password: this.state.loginpassword
        }
    this.props.loginUser(data).then((data) => {if(data.error){ this.setState({error: "Invalid Email or Password",showMyComponent: false}) }else{ this.context.router.history.push('/');} })
      }
    render() {

        const { handleSubmit } = this.props;
        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
              <h2>BOOKGRID</h2><br/><br/>
                <Field name="loginmail" component={renderInput} label="Email" type="text" onChange={event => this.handleLoginEmailChange(event.target.value)} />
                <Field name="loginpassword" component={renderInput} label="Password" type="password" onChange={event => this.handleLoginPasswordChange(event.target.value)} />
                { this.state.showMyComponent ? <CircularProgress className="error"/> : <span className="error">{this.state.error}</span> }
                <br/><br/>
                <RaisedButton type="submit" primary={true} label="Login"/><br/><br/><br/>
              
            </form>

          );
    }
}

const validate = values => {
    const errors = {}
    if (!values.loginmail) {
        errors.loginmail = 'Required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginmail)) {
        errors.loginmail = 'Type a valid email address';
    }
    else if (!values.loginpassword) {
        errors.loginpassword = 'Content cannot be empty';
      }

    return errors;
}

export default connect(null, {loginUser, fetchFacebookUser, fetchGoogleUser})(reduxForm({
    form: 'Authenticate',
    validate
})(Authenticate));
