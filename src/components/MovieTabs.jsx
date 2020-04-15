import React from 'react';
import classNames from 'classnames';

const MovieTabs = (props) => {
  const { sort_by, updateSortBy } = props;

  const handleClick = value => {
    return () => {
      updateSortBy(value)
    }
  }

  const getClassLink = value => {
    // return `nav-link ${sort_by === value ? 'active' : ''}`
    return classNames('nav-link', 'btn',{'active': sort_by === value})
  }

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <span 
          className={getClassLink("popularity.desc")}
          onClick={handleClick("popularity.desc")}
        >
          Popularity
        </span>
      </li>
      <li className="nav-item">
        <span
          className={getClassLink("revenue.desc")}
          onClick={handleClick("revenue.desc")}
        >
          Revenue
        </span>
      </li>
      <li className="nav-item">
        <span
          className={getClassLink("vote_average.desc")}
          onClick={handleClick("vote_average.desc")}
        >
          Vote average
        </span>
      </li>
    </ul>
  )
}

export default MovieTabs;