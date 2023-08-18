const PaginationButtons = () => {
  let buttons = [];

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>,
    );
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchRouteResults(page);
  };

  return <div>{buttons}</div>;
};
