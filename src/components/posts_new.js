import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import StarRatingComponent from 'react-star-rating-component';
const style = {
  marginLeft: 12,
  marginRight: 12,
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
  </div>//custom input component to handle errors
);

const renderTextArea = ({input, meta: { touched, error, warning }}) => (
    <div>
        <div className='row'>
            <TextField className='col-md-7' {...input} placeholder="Add some notes" multiLine={true}
      rows={4}
      rowsMax={4}/>
            {touched && ((error && <span className="error col-md-3">{error}</span>) || (warning && <span className="error">{warning}</span>))}
        </div>
    </div>
);//custom component for taking notes

class PostsNew extends Component {
  state = {
    value: 1,
    title: '',
    author: '',
    completion: 0,
    rating: 1,
    notes: '',
    thumbnail: ''

  };

  handlecompletion = (event, value) => {
   this.setState({completion: value});
 };//set state of reading progress to input value
componentWillReceiveProps(){
  if (this.props.initialValues) {
      this.setState({thumbnail: this.props.initialValues.imageUrl, title: this.props.initialValues.title, author: this.props.initialValues.author})
  }
//change initialvalues to that from book selected on search
}

  handleChange = (event, index, value) => this.setState({value});// genre to input value
  handleTitleChange = (value) => this.setState({title: value}); //title to input value
  handleAuthorChange = (value) => this.setState({author: value}); //author to input value
  onStarClick(nextValue, prevValue, name) {
          this.setState({rating: nextValue});
      } //star rating to input value
  handleNoteChange = (value) => this.setState({notes: value}); //notes to input value

    static contextTypes = {
        router: PropTypes.object
      };
      onSubmit(props){
        const data = {
          userid: this.props.user._id,
          value: this.state.value,
          title: this.state.title,
          author: this.state.author,
          completion:this.state.completion,
          rating: this.state.rating,
          notes: this.state.notes,
          thumbnail: this.state.thumbnail
        }//submit values from props(if initialValues not changed) and state
    this.props.createPost(data).then(() => { this.context.router.history.push('/'); })
  }//take to home page after submit
    render() {
        const { handleSubmit } = this.props;//get handleSubmit fn from redux form
        return (
          <div  className="addBook">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field name="title" component={renderInput} label="Title" type="text" onChange={event => this.handleTitleChange(event.target.value)} />
                <Field name="author" component={renderInput} label="Author" type="text" onChange={event => this.handleAuthorChange(event.target.value)} />
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
       <span style={completionCss}>Progress: {Math.round(this.state.completion*100)}%</span>
         <Slider value={this.state.completion} onChange={this.handlecompletion}/>
         <div className="row"><span style={style}>Rating:</span> <div style={style}><StarRatingComponent

                    name="rate1"
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                /></div></div><br/>
                <Field name="content" component={renderTextArea} onChange={event => this.handleNoteChange(event.target.value)} />
                <br/><br/>
                <RaisedButton type="submit" primary={true} label="Add Book" style={style}/>
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
} //form validation
function mapStateToProps(state, router) {
  return { user: state.user.data, googlebook: state.books.googlebook, initialValues: router.history.location.state}
}
export default connect(mapStateToProps, {createPost})(reduxForm({
    form: 'PostsNew',
    validate
})(PostsNew));
