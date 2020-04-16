import React from 'react';

export default class MovieItem extends React.Component {
  constructor() {
    super();

    this.state = {
      activeWillWatchBtn: false
    }
  }

  setMovieImage = (backdrop_path, poster_path) => {
    if(!(backdrop_path && poster_path)) {
      return 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'
    } else {
      return `https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`
    }
  }
  
  render() {
    const { movie, removeMovie, toggleWillWatch} = this.props,
          willWatchClass = 'btn btn-secondary btn-sm',
          removeWatchClass = 'btn btn-success btn-sm';

    return (
      <div className="card">
        <img 
          className="card-img-top md-4"
          src={this.setMovieImage(movie.backdrop_path, movie.poster_path)}
          alt=""/>
        <div className="card-body">
          <h5 className="card-title" title={movie.title}>{movie.title}</h5>
          <p className="mb-4">Rating: {movie.vote_average}</p>
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-danger btn-sm"
              type="button"
              onClick={removeMovie.bind(null, movie)}
            >
              Remove film
            </button>
            <button 
              type="button"
              className={this.state.activeWillWatchBtn ? removeWatchClass : willWatchClass}
              onClick={() => {
                this.setState({
                  activeWillWatchBtn: !this.state.activeWillWatchBtn
                });
                toggleWillWatch(movie);
              }}
            >
              {this.state.activeWillWatchBtn ? 'Not Watch' : 'Will Watch'}
            </button>
          </div>
        </div>
      </div>
    )
  }
  
}
