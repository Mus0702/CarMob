import "./Banner.css";
const Banner = ({ title, img }) => {
  return (
    <div
      className="main-banner"
      style={{
        backgroundImage: img,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default Banner;
