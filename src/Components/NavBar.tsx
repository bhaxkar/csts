import { Link } from "react-router-dom";
import NavBarItem from "./Common/NavItem";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GrContact } from "react-icons/gr";
import { IoMdHelp } from "react-icons/io";
import { RiCustomerServiceFill } from "react-icons/ri";

const NavBar: React.FC = () => {
  return (
    <div className="bg-navbar h-screen flex flex-col justify-between">
      <div className="flex flex-col gap-3 mt-4">
        <NavBarItem
          to="/"
          icon={<IoHomeOutline className="text-2xl font-bold" />}
          label="Home"
        />
        <NavBarItem
          to="/dashboard"
          icon={<MdOutlineDashboardCustomize className="text-2xl font-bold" />}
          label="Dashboard"
        />
        <NavBarItem
          to="/contact"
          icon={<GrContact className="text-2xl font-bold" />}
          label="Contact"
        />
      </div>

      <div className="hidden lg:block max-w-54 w-full bg-white border-0 rounded-lg shadow-lg p-4 m-2">
        <div className="text-black font-inter font-medium flex items-center py-2">
          <RiCustomerServiceFill />
          <p className="mr-1 ml-2">Need Help</p>
          <IoMdHelp />
        </div>
        <p className="text-sm font-mono pb-4">
          We help you set meaningful connection with customer
        </p>
        <Link
          to="/contact"
          className="font-inter text-white px-4 py-2 bg-black rounded-lg shadow-md"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
