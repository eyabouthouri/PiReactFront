import React, { useState } from 'react';

function Pagination({ currentPage, setCurrentPage, itemsPerPage, totalItems }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a href='!#' className='page-link' onClick={() => setCurrentPage(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>

      <button
        className='btn btn-primary'
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
