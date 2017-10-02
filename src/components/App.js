import React, { Component, PropTypes } from 'react';
import './App.css';
import classNames from 'classnames';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  STYLES,
  SORTS
} from '../constants';

const updateSearchTopstories= (hits,page) => (prevState) =>{
  const {searchKey, results} = prevState;

  const oldHits = results && results[searchKey]
  ? results[searchKey].hits
  : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return{
    results: {
    ...results,
    [searchKey]: { hits: updatedHits, page }
  },
    isLoading: false
};
};

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };

    this.needToSearchTopstories = this.needToSearchTopstories.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needToSearchTopstories(searchTerm){
    return !this.state.results[searchTerm];
  }

  setSearchTopstories(result){
    const {hits, page} = result;
    this.setState(updateSearchTopstories(hits, page));
}

  fetchSearchTopstories(searchTerm, page){
    this.setState({isLoading: true});

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount(){
    this.setState((prevState,props)=>{
      const { searchTerm } = prevState;
      return { searchKey: searchTerm };
    });
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.needToSearchTopstories(searchTerm)) this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  onDismiss(id){
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
    results: {
      ...results,
      [searchKey]: {hits: updatedHits, page}
      }
    });
  }

  render() {
    const {
      searchTerm,
      searchKey,
      results,
      isLoading,
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >Search
          </Search>
        </div>
         <Table
           list={list}
           onDismiss={this.onDismiss}
         />
        <div className="interactions">
        <ButtonWithLoading
          isLoading={isLoading}
          onClick={() => this.fetchSearchTopstories(searchKey, page+1)}>
          More
        </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

class Search extends Component {

  componentDidMount(){
    this.input.focus();
  }

  render(){
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;

    return(
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => {this.input = node; }}
          />
          <button type="submit">
            {children}
          </button>
      </form>
    );
  }
}

const Loading =()=> <div>Loading...</div>

class Table extends Component{

  constructor(props){
    super(props);
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey){
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render(){
    const{
      list,
      onDismiss
    } = this.props;

    const{
      sortKey,
      isSortReverse
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
    <div className="table">
        <div className="table-header">
          <span style={STYLES.largeColumn}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Title
            </Sort>
          </span>
          <span style={STYLES.smallColumn}>
                      <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={STYLES.largeColumn}>
            <Sort
              sortKey={'URL'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Url
            </Sort>
          </span>
          <span style={STYLES.smallColumn}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={STYLES.smallColumn}>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={STYLES.smallColumn}/>
        </div>
        { reverseSortedList.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={STYLES.largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={STYLES.smallColumn}>
            {item.author}
          </span>
          <span style={STYLES.largeColumn}>
            {item.url}
          </span>
          <span style={STYLES.smallColumn}>
            {item.num_comments}
          </span>
          <span style={STYLES.smallColumn}>
            {item.points}
          </span>
          <span style={STYLES.smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline">
              Dismiss
            </Button>
          </span>
        </div>
          )}
    </div>
  );
  }
}

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classNames(
      'button-inline',
      { 'button-active': sortKey === activeSortKey }
    );

  return(
  <Button
    onClick={() => onSort(sortKey)}
    className={sortClass}
  >
    {children}
  </Button>
  );
}

const Button = ({ onClick, className, children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const withLoading = (Component) => ( {isLoading, ...rest} ) =>
  isLoading ? <Loading /> : <Component { ...rest} />;

const ButtonWithLoading = withLoading(Button);

Button.defaultProps = {
  className: '',
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default App;

export {
  Button,
  Search,
  Table,
};
