import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
import HomeComponent from './dashboard';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import PostsNew from './posts_new';
import Authenticate from './auth.js';
import UpdateComponent from './update';
import { PrivateRoute } from  'react-router-with-props'
class App extends React.Component{

  render(){
  return  (<MuiThemeProvider>
      <BrowserRouter>
        <div>
          <MuiThemeProvider>
<PrivateRoute exact path="/" authed={this.props.user} redirectTo="/login" component={HomeComponent} />
  <Route path='/login' exact component={Authenticate}/>
  <Route path='/post/new' exact component={PostsNew} />
  <Route path='/post/update' exact component={UpdateComponent} />
  </MuiThemeProvider>
      </div>
    </BrowserRouter>
    </MuiThemeProvider>)
  }
}
function mapStateToProps(state) {
  return { user: state.user.data }
}
export default connect(mapStateToProps, { fetchUser })(App);
