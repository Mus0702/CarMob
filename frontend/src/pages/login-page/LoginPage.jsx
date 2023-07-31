import Login from "../../components/login/Login.jsx";
import Banner from "../../components/common/banner/Banner.jsx";

const LoginPage = () => {
  return (
    <>
      <Banner title="Veuillez vous authentifier" />
      <Login />
    </>
  );
};

export default LoginPage;
