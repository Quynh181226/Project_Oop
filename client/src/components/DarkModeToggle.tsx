// DarkModeToggle.tsx
interface DarkModeToggleProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
}

const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
    return (
        <label className="fui-checkbox-toggle" htmlFor="switch-mode">
            <input
                type="checkbox"
                id="switch-mode"
                className="toggle-input"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
            />
            <div className="toggle-bar">
                <div className="toggle-spin"></div>
            </div>
        </label>
    );
};

export default DarkModeToggle;