const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="spinner-grow text-success"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
