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
  } //if no books in list return null

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
    } //map through bboks without thumbnail
    if(!cardDetail.volumeInfo.authors){
      return null
    }//return null if no author(every creation has a creator)
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
            state: {
               title: cardDetail.volumeInfo.title, author: cardDetail.volumeInfo.authors[0],
               imageUrl: cardDetail.volumeInfo.imageLinks.thumbnail
             }//pass state defined as props
          }}>
          <FlatButton label="Add to List"/></Link></CardActions>
          <CardText expandable={true}>
            {cardDetail.volumeInfo.description}
          </CardText>
        </Card>
    )
  })
}
render(){
return  (<div>{ this.state.showMyComponent ?
   <div className="text-center"><CircularProgress className="paddingTop"/></div> :
    <ul className="paddingTop">
    {this.renderbookList()}
    </ul>}</div>
  ) //choose b/w loading bar and list of books
}
}
function mapStateToProps(state) {
  if(!state.books.all){ //books are undefined pass empty array as books
    return {
      cardDetail: []
    }
  }//else return array of books from reducer
  return{
    cardDetail: state.books.all.items
  };
}
BookList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null   )(BookList);
