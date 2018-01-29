import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';
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
);//custom component to handle errors in realtime


class Authenticate extends Component {

  state = {
    loginmail: '',
    loginpassword: '',
    error: '',
    showMyComponent: false
  };

  handleLoginEmailChange = (value) => this.setState({loginmail: value});//change state of mail to current value
  handleLoginPasswordChange = (value) => this.setState({loginpassword: value});//change state of password to current value

    static contextTypes = {
        router: PropTypes.object
      };
      onSubmit(props){  //submit mail and password states
        this.setState({showMyComponent: true})
        const data = {
          email: this.state.loginmail,
          password: this.state.loginpassword
        }
    this.props.loginUser(data).then((data) => {if(data.error){ this.setState({error: "Invalid Email or Password",showMyComponent: false}) }else{window.location.href = '/'; } })
      }
    render() {

        const { handleSubmit } = this.props;// get handleSubmit function from redux-form
        return (

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
              <h2>BOOKGRID</h2><br/><br/>
                <Field name="loginmail" component={renderInput} label="Email" type="text" onChange={event => this.handleLoginEmailChange(event.target.value)} />
                <Field name="loginpassword" component={renderInput} label="Password" type="password" onChange={event => this.handleLoginPasswordChange(event.target.value)} />
                { this.state.showMyComponent ? <CircularProgress className="error"/> : <span className="error">{this.state.error}</span> }
                <br/><br/>
                <RaisedButton type="submit" primary={true} label="Login"/><br/>

            </form>

          );
    }
}

const validate = values => {
    const errors = {}
    if (!values.loginmail) {
        errors.loginmail = 'Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginmail)) {
        errors.loginmail = 'Type a valid email address';
    }
    else if (!values.loginpassword) {
        errors.loginpassword = 'Content cannot be empty';
      }
      else if (!values.loginpassword.length>6) {
          errors.loginpassword = 'Password should be atleast 6 characters';
        }

    return errors;
}//form validation

export default connect(null, {loginUser })(reduxForm({
    form: 'Authenticate',
    validate
})(Authenticate));//pass control to redux form as well as connect reducers and action creators
