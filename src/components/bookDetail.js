import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link} from 'react-router-dom';

class bookDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount(){
    this.props.fetchPost(this.props.match.params.id)
  }
  onDeleteClick(){
    this.props.deletePost(this.props.match.params.id)
    .then(() => { this.context.router.history.push('/posts'); })
  }
  render() {
    const { post } = this.props;
    if(!post){
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to='/posts'>Back to Books</Link>
        <Link to='/posts'>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >
        Delete Post
        </button>
        </Link>
        <h3>{post.title}</h3>
        <span>Categories: {post.categories}</span>
        <p>{post.content}</p>
        </div>
    );
  }
}
function mapStateToProps(state){
  return { post: state.books.post };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(bookDetail);
