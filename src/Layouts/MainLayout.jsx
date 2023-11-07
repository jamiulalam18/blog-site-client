import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComponents/Navbar";
import Footer from "../Components/SharedComponents/Footer";
import useTheme from "./../hooks/useTheme";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const { changeTheme, mode } = useTheme();
  return (
    <div>
      <button onClick={changeTheme}>
        Make {mode === "dark" ? "Light" : "Dark"}
      </button>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
