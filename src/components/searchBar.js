import React, {Component} from 'react';
//eslint-disable-next-line
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
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
  }else {
    return (
        <div><span>BookGrid</span><input
            placeholder="Search Books"
          value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)}
      />

      </div>
      );
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
    }
  }
}
export default SearchBar;
