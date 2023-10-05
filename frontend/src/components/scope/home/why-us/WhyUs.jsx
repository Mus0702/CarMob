const WhyUs = () => {
  return (
    <div className="container">
      {/*<h2 className="text-center mt-5">Why Us?</h2>*/}
      <div className="row">
        <div className="col-lg-6">
          <div className="card" style={{ border: "none" }}>
            <h3>Eco-responsible actor</h3>
            <p>
              Reduce your carbon footprint, one journey at a time. Choosing
              CarMob is not only about sharing the cost and the conviviality,
              but also taking a concrete step towards our planet. For every
              kilometer we travel together, that's as much CO2 less in the
              atmosphere. Together, let's take a step towards a greener future.
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <img
              src="/src/assets/images/paper-style-earth-globe-with-car.jpg"
              alt="Image de covoiturage"
              style={{
                backgroundImage:
                  'url("/src/assets/images/paper-style-earth-globe-with-car.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                width: "50%",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
