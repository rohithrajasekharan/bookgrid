import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';
import CircularProgress from 'material-ui/CircularProgress';
import Authenticate from './auth';
import App from './App'
//js styling

 class AuthCheck extends Component {
     //to display progress circle when data is beig loaded
   state = {
     showMyComponent: false,
     showLoading: true
   };
   //trigger fetchPost action when component is being mounted
  componentWillMount(){
  this.props.fetchUser().then(() => {if (this.props.user){
    this.setState({showMyComponent: true});
  }
  this.setState({showLoading: false})
});
  }

    render(){
    if (this.state.showLoading) {
      return (<div className="text-center paddingTop"><CircularProgress/></div>);
    }else{
      return(
      this.state.showMyComponent ? <App/> : <Authenticate/>
    )
  }
    }
}
//data from reducers to props
function mapStateToProps(state) {
  return {user: state.user.data}
}
export default connect(mapStateToProps, { fetchUser })(AuthCheck);
