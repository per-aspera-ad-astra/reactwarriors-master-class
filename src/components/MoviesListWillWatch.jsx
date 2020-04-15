import React from 'react';

const MoviesListWillWatch = (props) => {

  return (
    <div className="col-12 col-md-3 movies-list">
      <h4 className="aside-title h5 mt-2 mb-4">Will watch: {props.moviesList.length} {props.moviesList.length === 1 ? 'movie' : 'movies'}</h4>
      <ul className="list-group">
        {props.moviesList.map((movie) => {
          return (
            <li className="list-group-item" key={movie}>
              {movie}
            </li>
          )
        })} 
      </ul>
    </div>
  )
}

export default MoviesListWillWatch;