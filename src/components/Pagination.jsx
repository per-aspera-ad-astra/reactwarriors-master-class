import React from 'react';

const Pagination = (props) => {
  const { updatePreviousPage, updateNextPage, currentPage, totalPages } = props;

  return (
    <nav aria-label="Page nanigation">
      <ul className="pagination mb-0 justify-content-center">
        <li 
          className="page-item"
          onClick={updatePreviousPage}
        >
          <span className="btn btn-info" aria-label="Previous">
            <span aria-hidden="true">Previous</span>
          </span>
        </li>
        <li className="page-item">
          <span className="btn btn-light">{currentPage} of {totalPages}</span>
        </li>
        <li 
          className="page-item"
          onClick={updateNextPage}
        >
          <span className="btn btn-info" aria-label="Next">
            <span aria-hidden="true">Next</span>
          </span>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;