import Button from "./Button";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { useTheme } from "../../Context/ThemeContext";

interface HeaderProps {
  pageName: string;
  message?: string;

  button?: {
    btntype: "button" | "submit" | "reset";
    btnLabel: string;
    btnIcon: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
  };
}

const Header: React.FC<HeaderProps> = ({
  pageName,
  message,
  button,
}: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-2">
      <div className="text-primary-text bg-surface font-mono border-b-1 border-border-nav flex justify-between items-center px-2 sm:px-4 md:px-6 py-2">
        <div className="text-base sm:text-lg md:text-xl">{pageName}</div>
        <button
          onClick={toggleTheme}
          className="border-2 rounded-full p-1 cursor-pointer"
        >
          {theme === "light" ? (
            <IoMoonSharp className="text-lg" />
          ) : (
            <MdSunny className="text-lg" />
          )}
        </button>
      </div>

      <div className="flex justify-center md:justify-between px-2 sm:px-4 md:px-6 py-4">
        <p className="hidden md:block max-w-[25ch] text-lg md:text-2xl text-primary-text font-mono">
          {message}
        </p>

        {button && (
          <Button
            type="button"
            label={button.btnLabel}
            icon={button.btnIcon}
            onPress={button.onPress}
          ></Button>
        )}
      </div>
    </header>
  );
};

export default Header;
