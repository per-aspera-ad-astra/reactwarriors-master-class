import React from "react";
import { API_URL, API_KEY_3} from "../utils/api";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import MovieListWillWatch from "./MoviesListWillWatch";
import Pagination from "./Pagination";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      moviesListWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total_pages: 0
    }

    // console.log('constructor');

    // this.removeFilm = this.removeFilm.bind(this);
  }

  // removeFilm(movie) {
  //   const updateMovies = this.state.movies.filter((item) => {
  //     return item.id !== movie.id;
  //   })
    
  //   this.setState({
  //     movies: updateMovies
  //   })
  // }

  componentDidMount() {
    // console.log('did mount');
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("didUpdate");
    // console.log("prev", prevProps, prevState);
    // console.log("current", this.props, this.state);

    if(prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
     this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages
        })
      });
  }

  removeFilm = (movie) => {
    const updateMovies = this.state.movies.filter((item) => {
      return item.id !== movie.id;
    })
    this.setState({
      movies: updateMovies
    })
  }

  toggleWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch,
          updateMoviesListWillWatch = this.state.moviesListWillWatch;

    if(updateMoviesWillWatch.indexOf(movie.id) === -1) {
      updateMoviesWillWatch.push(movie.id);
      updateMoviesListWillWatch.push(movie.title);
    } else {
      updateMoviesWillWatch.splice(updateMoviesWillWatch.indexOf(movie.id), 1);
      updateMoviesListWillWatch.splice(updateMoviesListWillWatch.indexOf(movie.title), 1);
    }

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
      moviesListWillWatch: updateMoviesListWillWatch
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value
    })
  }

  updatePreviousPage = () => {
    if(this.state.page !== 1) {
      this.setState({
        page: this.state.page - 1
      })
    }
  }

  updateNextPage = () => {
    if(this.state.page !== this.state.total_pages) {
      this.setState({
        page: this.state.page + 1
      })
    }
    
  }

  render() {
    // console.log('render');
    // console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <h1 className="col-12 mb-4 text-justify app-title h3">Movie app</h1>
          <div className="col-12 col-md-9">
            <div className="row mb-3">
              <div className="col-12">
                <MovieTabs 
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col col-md-6 col-xl-4 mb-4" key={movie.id}>
                    <MovieItem 
                      movie={movie}
                      removeMovie={this.removeFilm}
                      toggleWillWatch={this.toggleWillWatch}
                    />
                  </div>
                )
              })}
            </div>
            <div className="row">
              <div className="col">
                <Pagination 
                  updatePreviousPage={this.updatePreviousPage}
                  updateNextPage={this.updateNextPage}
                  currentPage={this.state.page}
                  totalPages={this.state.total_pages}
                />
              </div>
            </div>
          </div>
          <MovieListWillWatch 
            moviesList={this.state.moviesListWillWatch}
          />
        </div>
      </div>
    )
  }
}
