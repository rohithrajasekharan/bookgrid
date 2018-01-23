import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {  savePost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import StarRatingComponent from 'react-star-rating-component';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  marginLeft: 12,
  marginRight: 12
};
const completionCss = {
  fontSize: 14,
}
const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <div>
      <TextField {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="error">{warning}</span>))}
    </div>
  </div>
);

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
    <div>
        <div className='row'>
            <TextField id="text-field-controlled" className='col-md-7' {...input} placeholder="Add some notes" multiLine={true}
      rows={4}
      rowsMax={4}/>
            {touched && ((error && <span className="error col-md-3">{error}</span>) || (warning && <span className="error">{warning}</span>))}
        </div>
    </div>
);

class UpdateComponent extends Component {

  state = {
    value: 1,
    title: '',
    author: '',
    completion: 0,
    rating: 1,
    notes: ''

  };
componentWillReceiveProps(){
  if(!this.props.initialValues.length){
    if (this.state.title==='') {
      this.setState({
        value: this.props.initialValues.value,
        completion: this.props.initialValues.completion,
        rating: this.props.initialValues.rating,
        title: this.props.initialValues.title,
        author: this.props.initialValues.author,
        notes: this.props.initialValues.notes
      })
    }
  }
}
  handlecompletion = (event, value) => {
   this.setState({completion: value});
 };


  handleChange = (event, index, value) => this.setState({value});
  handleTitleChange = (value) => this.setState({title: value});
  handleAuthorChange = (value) => this.setState({author: value});
  onStarClick(nextValue, prevValue, name) {
          this.setState({rating: nextValue});
      }
  handleNoteChange = (value) => this.setState({notes: value});

  updateBook = (id) => {
    const values = {
      value: this.state.value,
      title: this.state.title,
      author: this.state.author,
      completion:this.state.completion,
      rating: this.state.rating,
      notes: this.state.notes,
    }
    const data = {
      id: id,
      values: values
    }
    this.props.savePost(data).then(() => { this.context.router.history.push('/'); })
  }
  deleteBook = (id) => {
    this.props.deletePost(id).then(() => { this.context.router.history.push('/'); })
  }

    static contextTypes = {
        router: PropTypes.object
      };

    render() {
      if (!this.props.initialValues) {
        return <CircularProgress/>
      }
        return (
          <div  className="addBook">
            <RaisedButton  onClick={() => {this.deleteBook(this.props.initialValues._id)}} secondary={true} label="Delete" className="delete" style={style}/>
            <form >
                <Field name="title" value={this.state.title} component={renderInput} label="Title" type="text" onChange={event => this.handleTitleChange(event.target.value)} />
                <Field name="author" value={this.state.author} component={renderInput} label="Author" type="text" onChange={event => this.handleAuthorChange(event.target.value)} />
                <SelectField
          floatingLabelText="Genre"
          value={this.state.value}
          onChange={this.handleChange}
           name="categories" label="Categories" type="text" >
        <MenuItem value={1} primaryText="Miscellaneous" />
         <MenuItem value={2} primaryText="Fantasy" />
         <MenuItem value={3} primaryText="Adventure" />
         <MenuItem value={4} primaryText="Education" />
         <MenuItem value={5} primaryText="Comedy" />
         <MenuItem value={6} primaryText="Drama" />
         <MenuItem value={7} primaryText="Horror fiction" />
         <MenuItem value={8} primaryText="Literary realism" />
         <MenuItem value={9} primaryText="Romance" />
         <MenuItem value={10} primaryText="Satire" />
         <MenuItem value={11} primaryText="Tragedy" />
         <MenuItem value={12} primaryText="Mythology" />

       </SelectField><br/><br/>
       <span style={completionCss}>Completion: {Math.round(this.state.completion*100)}%</span>
         <Slider value={this.state.completion} onChange={this.handlecompletion}/>
         <div className="row"><span style={style}>Rating:</span> <div style={style}><StarRatingComponent
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                /></div></div><br/>
                <Field name="notes" value={this.state.notes} component={renderTextArea} onChange={event => this.handleNoteChange(event.target.value)} />
                <br/><br/>
                <RaisedButton onClick={() => {this.updateBook(this.props.initialValues._id)}} primary={true} label="Update" style={style}/>
                <Link to="/"><RaisedButton type="submit" secondary={true} label="Cancel" style={style}/></Link>
            </form>
            </div>
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
function mapStateToProps(state) {
  return { user: state.user.data, initialValues: state.posts.post }
}
export default connect(mapStateToProps, {savePost, deletePost})(reduxForm({
    form: 'Update',
    validate,
})(UpdateComponent));
