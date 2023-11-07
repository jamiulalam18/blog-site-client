import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorToast = (str) => {
  toast.error(str, {
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

const ErrorToast = () => {
  return null;
};

export default ErrorToast;
