import { Link, useNavigate } from "react-router-dom";
import { Logo, Menu, Close, Logout } from "../assets";
import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  //const [active, setActive] = useState("Election");
  const [toggle, setToggle] = useState(false);
  const { role, isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/Login");
  };

  console.log(isAuthenticated);
  return (
    <nav className=" flex-row flex sm:justify-around w-[90%] items-center border-b-2 border-solid border-border navbar">
      <img src={Logo} alt="Logo" />
      <ul className=" sm:flex hidden flex-row gap-10 items-center justify-center">
        <Link
          to="/Election"
          className=" text-typo font-poppins hover:text-primary"
        >
          <li>Election</li>
        </Link>
        <Link
          to="/Stats"
          className=" text-typo font-poppins hover:text-primary"
        >
          <li>Stats</li>
        </Link>
        <Link
          to="/Creation"
          className=" bg-primary text-white px-4 py-2 rounded-sm"
        >
          <li>Create new election </li>
        </Link>
        <button
          onClick={handleClick}
          className="text-typo bg-transparent font-poppins hover:text-primary"
        >
          <img src={Logout} alt="Logout" />
        </button>
      </ul>
      <h1 className="sm:ml-0 ml-24">Username</h1>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? Close : Menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-gris absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col bg-green-100 p-4 rounded-md gap-3">
            <Link
              to="/Creation"
              className="text-typo font-poppins hover:text-primary "
            >
              <li>Create new election </li>
            </Link>
            <Link
              to="/Election"
              className=" text-typo font-poppins hover:text-primary"
            >
              <li>Election</li>
            </Link>
            <Link
              to="/Stats"
              className=" text-typo font-poppins hover:text-primary"
            >
              <li>Stats</li>
            </Link>
            <button
              onClick={handleClick}
              className="text-typo bg-transparent font-poppins hover:text-primary"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
