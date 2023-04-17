import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../redux/theme";
import { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function ThemeButton(props) {
  const isDarkMode = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();
  const toggleDarkMode = (checked) => {
    dispatch(setDarkMode(checked));
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div style={{ position: "absolute", right: 30 }}>
      <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={50} />
    </div>
  );
}

export default ThemeButton;
