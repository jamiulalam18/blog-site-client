import Navbar from "../Components/SharedComponents/Navbar";
import ErrorComponent from "./../Components/ErrorComponent";
import Footer from "./../Components/SharedComponents/Footer";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <div className="min-h-screen relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: Error</title>
      </Helmet>
      <Navbar></Navbar>
      <ErrorComponent></ErrorComponent>

      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"> */}
      <Footer></Footer>
      {/* </div> */}
      <ToastContainer />
    </div>
  );
};

export default ErrorPage;
