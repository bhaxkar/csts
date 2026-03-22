import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavBarItem: React.FC<NavItemProps> = ({
  to,
  icon,
  label,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col lg:flex-row items-center lg:gap-x-2 font-inter lg:text-lg mx-2 lg:mx-4 p-2
            ${
              isActive
                ? "border-1 border-white bg-white rounded-sm shadow-sm text-navbar"
                : "text-white"
            }`
      }
    >
      {icon}
      <p className="hidden md:block text-sm">{label}</p>
    </NavLink>
  );
};

export default NavBarItem;
