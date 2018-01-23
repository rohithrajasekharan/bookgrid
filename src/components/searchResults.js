import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
class BookList extends React.Component {
  state = {
    showMyComponent: true
  };
  static contextTypes = {
      router: PropTypes.object
    };
    componentWillReceiveProps(){
    if(this.props.cardDetail){
      this.setState({showMyComponent: false})
    }
    }
renderbookList = () => {
  if(!this.props.cardDetail){
    return null;
  }

  return this.props.cardDetail.map((cardDetail) => {
    if(!cardDetail.volumeInfo.imageLinks){
      return(
        <Card id="card">
          <CardHeader
            title={cardDetail.volumeInfo.title}
            subtitle={cardDetail.volumeInfo.authors}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
            <Link to={{
      pathname: '/post/new',
      state: { title: cardDetail.volumeInfo.title, author: cardDetail.volumeInfo.authors[0] }
    }}>  <FlatButton label="Add to List"/></Link></CardActions>
          <CardText expandable={true}>
          {cardDetail.volumeInfo.description}
          </CardText>
        </Card>
      )
    }
    if(!cardDetail.volumeInfo.authors){
      return null
    }
    return(
      <Card id="card">
        <CardHeader
          title={cardDetail.volumeInfo.title}
          subtitle={cardDetail.volumeInfo.authors}
          avatar={cardDetail.volumeInfo.imageLinks.thumbnail}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <Link to={{
    pathname: '/post/new',
    state: { title: cardDetail.volumeInfo.title, author: cardDetail.volumeInfo.authors[0], imageUrl: cardDetail.volumeInfo.imageLinks.thumbnail }
  }}>  <FlatButton label="Add to List"/></Link></CardActions>
        <CardText expandable={true}>
        {cardDetail.volumeInfo.description}
        </CardText>
      </Card>
    )
  })
}
render(){
return  (<div>{ this.state.showMyComponent ? <div className="text-center"><CircularProgress className="paddingTop"/></div> :   <ul className="paddingTop">
    {this.renderbookList()}
    </ul>}</div>
  )
}
}
function mapStateToProps(state) {
  if(!state.books.all){
    return {
      cardDetail: []
    }
  }
  return{
    cardDetail: state.books.all.items
  };
}
BookList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null   )(BookList);
