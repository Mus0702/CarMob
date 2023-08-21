const SearchBanner = ({ resultSize }) => {
  return (
    <div>
      <div className="container my-5">
        {resultSize < 1 ? (
          <h2 className="text-center fw-bold">No routes found</h2>
        ) : (
          <h2 className="text-center fw-bold">Found {resultSize} results</h2>
        )}
      </div>
    </div>
  );
};

export default SearchBanner;
