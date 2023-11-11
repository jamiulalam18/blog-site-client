import { useEffect, useState } from "react";

const useTheme = () => {
  const [mode, setMode] = useState("light");
  const html = document.documentElement;
  const changeTheme = () => {
        if (mode == "light") {
      html.classList.remove("light");
      html.classList.add("dark");
      setMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  };

  useEffect(() => {
    const currentMode = localStorage.getItem("mode") || "light";
    setMode(currentMode);
    document.documentElement.classList.add(currentMode);
  }, []);
  return {changeTheme, mode}
};

export default useTheme;
