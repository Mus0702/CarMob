import React from "react";

const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1 className="text-danger">404</h1>
          <p>Page Not Found</p>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
