const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const handlePageChange = (pageNumber: any) => {
    onPageChange(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  return (
    <nav>
      <ul className="pagination d-flex align-center jc-center">
        <button onClick={handleFirstPage}>First</button>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        {/* {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))} */}

        <button onClick={handleNextPage}>Next</button>

        <button onClick={handleLastPage}>Last</button>
      </ul>
    </nav>
  );
};

export default Pagination;
