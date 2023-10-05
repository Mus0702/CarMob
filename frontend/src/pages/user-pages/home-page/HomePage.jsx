import WhyUs from "../../../components/scope/home/why-us/WhyUs.jsx";
import Banner from "../../../components/common/banner/banner-with-images/Banner.jsx";
import HomeImage from "../../../assets/images/home-image2.svg";
import SearchRoute from "../../../components/scope/home/search-route/SearchRoute.jsx";

const HomePage = () => {
  return (
    <div>
      <Banner img={`url(${HomeImage})`} title="Welcome to CarMob" />
      <div>
        <div style={{ marginBottom: "100px" }}>
          <SearchRoute />
        </div>
        <div>
          <WhyUs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
