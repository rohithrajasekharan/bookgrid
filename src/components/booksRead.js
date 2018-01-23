import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts,fetchPost } from '../actions/index';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import StarRatingComponent from 'react-star-rating-component';
import { Line } from 'rc-progress';
import CircularProgress from 'material-ui/CircularProgress';
const style = {
  marginLeft: 22,
  marginRight: 22,
  fontSize: 14
};

 class BooksRead extends Component {
   static contextTypes = {
       router: PropTypes.object
     };
   state = {
     showMyComponent: true
   };
  componentWillMount(){
  this.props.fetchPosts().then(() => {this.setState({showMyComponent: false})});

  }
  fetchPost = (id) => {
    this.props.fetchPost(id).then(() => { this.context.router.history.push('/post/update'); })
  }
  renderBooks(){

      return this.props.cardDetail.map((cardDetail) => {
        if (this.props.filter==='') {
          return(
            <div>
            <Card id="bookCard">
              {cardDetail.thumbnail? <CardHeader
                title={cardDetail.title}
                subtitle={cardDetail.author}
                actAsExpander={true}
                avatar={cardDetail.thumbnail}
                showExpandableButton={true}
              />: <CardHeader
                title={cardDetail.title}
                subtitle={cardDetail.author}
                actAsExpander={true}
                showExpandableButton={true}
              />}
              <div style={style}><StarRatingComponent editing={false} value={cardDetail.rating}/></div>
              <span style={style}>Genre: {this.props.genre[cardDetail.value-1]}</span><br/>
              <span style={style}>Progress: {Math.round(cardDetail.completion*100)}%</span><br/>
              <Line percent={cardDetail.completion*100}  strokeWidth="2" trailWidth="2" style={style}/>
              <br/><CardText expandable={true}><code>{cardDetail.notes}</code></CardText><CardActions>
                <FlatButton label="Edit" onClick={() => this.fetchPost(cardDetail._id)} />
              </CardActions>

            </Card>
        </div>
          )
        }
      else if (this.props.filter===this.props.genre[cardDetail.value-1]) {
          return(
            <div>
            <Card id="bookCard">
              {cardDetail.thumbnail? <CardHeader
                title={cardDetail.title}
                subtitle={cardDetail.author}
                actAsExpander={true}
                avatar={cardDetail.thumbnail}
                showExpandableButton={true}
              />: <CardHeader
                title={cardDetail.title}
                subtitle={cardDetail.author}
                actAsExpander={true}
                showExpandableButton={true}
              />}
              <div style={style}><StarRatingComponent editing={false} value={cardDetail.rating}/></div>
              <span style={style}>Genre: {this.props.genre[cardDetail.value-1]}</span><br/>
              <span style={style}>Progress: {Math.round(cardDetail.completion*100)}%</span><br/>
              <Line percent={cardDetail.completion*100}  strokeWidth="2" trailWidth="2" style={style}/>
              <br/><CardText expandable={true}><code>{cardDetail.notes}</code></CardText><CardActions>
                <FlatButton label="Edit" onClick={() => this.fetchPost(cardDetail._id)}/>
              </CardActions>

            </Card>
        </div>
          )
        }
    })
  }
    render(){
      if (this.props.cardDetail) {
        if(this.props.cardDetail.length!==0){
        return(
          <ul className="paddingTop booksRead">
          {this.renderBooks()}
          </ul>
        )}else{
          return <div className="text-center">{ this.state.showMyComponent ? <CircularProgress className="paddingTop"/> : ""}</div>
        }
      }

    }
  }

function mapStateToProps(state) {
  return { cardDetail: state.posts.all, user: state.user.data, genre: state.posts.genre}
}
export default connect(mapStateToProps, { fetchPosts, fetchPost })(BooksRead);
