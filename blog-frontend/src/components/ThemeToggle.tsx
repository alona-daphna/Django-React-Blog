import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const setDarkMode = () => {
    document.querySelector('body')?.setAttribute('data-theme', 'dark');
    setTheme('dark');
  };

  const setLightMode = () => {
    document.querySelector('body')?.setAttribute('data-theme', 'light');
    setTheme('light');
  };

  const toggleTheme = (e) => {
    if (e.target.checked) setLightMode();
    else setDarkMode();
  };

  return (
    <div>
      <input
        className="theme-input"
        type="checkbox"
        checked={theme === 'light'}
        onChange={toggleTheme}
      ></input>
    </div>
  );
};
