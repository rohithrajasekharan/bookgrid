import React, {Component} from 'react';
//eslint-disable-next-line
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;//screen width to control appbar title
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      searchToggle: false
  };
  }

  render() {
    if (width<480 || window.innerWidth<480) {
      return <input
          placeholder="Search Books"
        value={this.state.term}
      onChange={event => this.onInputChange(event.target.value)}
    />
  }//appbar without title
  else {
    return (
        <div><span>BookGrid</span><input
            placeholder="Search Books"
          value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)}
      />

      </div>
    );//appbar with title
  }
  }

  onInputChange(term){
    if (term==='') {
        this.setState({term: '', searchToggle: false});
        this.props.onSearchToggle(false);
    }else {
      this.setState({term: term, searchToggle: true})
      this.props.onSearchTermChange(term);
      this.props.onSearchToggle(true);
    }//change state of searchToggle to switch b/w searchresult and book list
  }
}
export default SearchBar;
