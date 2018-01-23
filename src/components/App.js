//Root component with all the routes
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';//theme the material ui components
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
import HomeComponent from './dashboard';
import { Route, BrowserRouter } from 'react-router-dom';
import PostsNew from './posts_new';
import Authenticate from './auth.js';
import UpdateComponent from './update';
import { PrivateRoute } from  'react-router-with-props';//redirect unauthenticated users to login

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
//add the application state(not react state) from reducers to props
function mapStateToProps(state) {
  return { user: state.user.data }
}
export default connect(mapStateToProps, { fetchUser })(App);//connect redux data and action to App component
