import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import './style.css';
import * as Actions from './actions';
import Textbox from './textbox';

const renderMovie = (movie, index) => (
  <div key={index} className="moviebox">
    <Link to={`/movies/${movie.imdbID}`}>
      {`${movie.Title} (${movie.Year})`}
    </Link>
  </div>
);

const Search = (props) => {
  const { performSearch, movies, searchText } = props;
  const renderMovies = () => movies.map(renderMovie);

  return (
    <div>
      <div className="searchBar">
        <div>Search titles: <Textbox /></div>
        <button onClick={() => performSearch(searchText)}>
          FIND MY MOVIES!
        </button>
      </div>
      <div className="searchResults">
        {renderMovies()}
      </div>
    </div>
  );
};

Search.propTypes = {
  performSearch: React.PropTypes.func,
  movies: React.PropTypes.instanceOf(Immutable.List),
  searchText: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    searchText: state.get('searchText', ''),
    movies: state.get('movies', new Immutable.List()),
  };
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Search);
