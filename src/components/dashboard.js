import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBooks, fetchUser,logoutUser } from '../actions/index';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline';
import CommunicationImportContacts from 'material-ui/svg-icons/communication/import-contacts';
import { Link} from 'react-router-dom';
import PostsNew from './posts_new';
import SearchBar from './searchBar';
import Authenticate from './auth';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import BookList from './searchResults';
import BooksRead from './booksRead';
var _ = require('lodash');
//eslint-disable-next-line
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
const style = {
  margin: 5,
};
class HomeComponent extends React.Component {
  static contextTypes = {
      router: PropTypes.object
    };
  constructor(props) {
    super(props);
if(width<746){
  this.state = {
    open: false,
    Profileopen: false,
    books: [],
    filter: "",
    searchToggle: false,
  };
}
else {
  this.state = {
     open: true,
     Profileopen: false,
     books: [],
     filter: "",
     searchToggle: false,
   };
}

  }
handleResize = () => {
  if(window.innerWidth<960){
    this.setState({open: false})
  }else {
    this.setState({open: true})
  }
}
componentWillMount() {
  this.props.fetchUser()
  window.addEventListener('resize', this.handleResize)
}
componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
  }
findGenre = () => {
  this.props.books.map((book) => {
    if (_.includes(this.state.books, this.props.genre[book.value-1])) {
      return null
    }else{
      this.state.books.push(this.props.genre[book.value-1]);
    }
  })
}
setSearch = (value) => {
  this.setState({searchToggle: value})
}
  bookSearch = (term) => {
    this.props.fetchBooks(term);
  }

  handleToggle = () => this.setState({open: !this.state.open});


  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      Profileopen: true,
      anchorEl: event.currentTarget,
    });
  };
  handleGenre = (event) => {
    this.setState({
  filter:event.genre
    });
  };
handleAllBooks= (event) => {
  this.setState({
filter: ''
  });
};

  handleRequestClose = () => {
    this.setState({
      Profileopen: false,
    });
  };
filterFunction = (genre) => {
  this.setState({filter: genre})
}
handleLogout = () => {
  this.props.logoutUser().then(()=>{
    this.context.router.history.push('/login');
  })
}
  render() {
  return(
  <div>
  <AppBar
    className="fixed"
    title={<SearchBar onSearchToggle={value => {this.setSearch(value)}} onSearchTermChange={term => this.bookSearch(term)}/>}
    iconElementLeft={<IconButton onClick={this.handleToggle}><ActionViewHeadline /></IconButton>}
    iconElementRight={<Avatar size={35} style={style} id='avatar' backgroundColor={'#4DD0E1'} onClick={this.handleClick} src={this.props.user.avatar}>{String(this.props.user.name).charAt(0)}</Avatar>}
  />

  <Popover
          open={this.state.Profileopen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Sign out" onClick={() => {
              this.handleLogout();
            }}/>
          </Menu>
 </Popover>
 <div className="books">
  <div><Drawer containerStyle={{height: 'calc(100% - 64px)', top: 64}} open={this.state.open} >

  <List>
      <Link to='/post/new' component={PostsNew}>
      <ListItem primaryText="Add Books" leftIcon={<CommunicationImportContacts />} />
      </Link>
 </List>
  <Divider />{
 this.props.books? <List>
   {this.props.books.length!==0 ? this.findGenre() : ""}
 <ListItem primaryText="All books" onClick={() => this.handleAllBooks()}/>

{(this.state.books.length!==0)?
  this.state.books.map((genre, index) => {
    return <MenuItem key={index} value={index} primaryText={genre} onClick={() => this.handleGenre({genre})}/>
  }) :  null
}
</List> : null}
</Drawer></div>
    {!this.state.searchToggle ? <BooksRead filter={this.state.filter} /> : <BookList/>}
    </div>
      </div>
)


}}
function mapStateToProps(state) {
  return { user: state.user.data, books: state.posts.all, genre: state.posts.genre}
}

export default connect(mapStateToProps, { fetchBooks, fetchUser, logoutUser })(HomeComponent);
