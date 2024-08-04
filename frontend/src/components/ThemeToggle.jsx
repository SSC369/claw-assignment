import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2  rounded-full focus:outline-none"
    >
      {theme === "light" ? (
        <IoMoon color="white" className="text-3xl" />
      ) : (
        <MdSunny color="orange" className="text-3xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
