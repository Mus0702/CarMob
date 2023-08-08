import WhyUs from "../../../components/scope/home/why-us/WhyUs.jsx";
import Banner from "../../../components/common/banner/Banner.jsx";
import HomeImage from "../../../assets/images/home-image2.svg";

const HomePage = () => {
  return (
    <div>
      <Banner img={`url(${HomeImage})`} title="Welcome to CarMob" />
      <WhyUs />
    </div>
  );
};

export default HomePage;
