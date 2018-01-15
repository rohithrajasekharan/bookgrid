import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router-dom';

 class booksRead extends Component {
  componentWillMount(){
    this.props.fetchPosts();
  }
  renderBooks(){
    return this.props.books.map((book) => {
      return (
        <li className="list-group-item" key={book._id}>
        <Link to={"posts/"+book._id}>
        <span className="col-md-9">{book.categories}</span>
        <strong>{book.title}</strong>
        </Link>
        </li>
      );
    })
  }
  render() {
    return (
      <div>
      <div className="text-xs-right">
        <Link to="/post/new" className="btn btn-primary">
        Add Books
      </Link>
      </div>
        <h3>Books</h3>
        <ul className="list-group">
        {this.renderBooks()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { books: state.books.all}
}
export default connect(mapStateToProps, { fetchPosts })(booksRead);
