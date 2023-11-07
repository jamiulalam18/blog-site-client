import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = (str) => {
    toast.success(str, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
const SuccessToast = () => {
    return null;
};

export default SuccessToast;