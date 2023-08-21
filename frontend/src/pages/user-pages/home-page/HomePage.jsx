import WhyUs from "../../../components/scope/home/why-us/WhyUs.jsx";
import Banner from "../../../components/common/banner/banner-with-images/Banner.jsx";
import HomeImage from "../../../assets/images/home-image2.svg";
import SearchRoute from "../../../components/scope/home/search-route/SearchRoute.jsx";

const HomePage = () => {
  return (
    <div>
      <Banner img={`url(${HomeImage})`} title="Welcome to CarMob" />
      <SearchRoute />
      <WhyUs />
    </div>
  );
};

export default HomePage;
