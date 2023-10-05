import React, { useState } from "react";
import { images } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../store/actions/user";
const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "DashBoard", type: "link", href: "/dashboard" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
  { name: "FAQ's", type: "link", href: "/faq" },
];

const NavItem = ({ item }) => {
  const [dropdown, setdropdown] = useState(false);

  const dropdowntogglerhandler = () => {
    setdropdown((currstate) => {
      return !currstate;
    });
  };

  return (
    <>
      <li className="relative group">
        {item.type === "link" ? (
          <>
            <Link to={item.href} className="px-4 py-2">
              {item.name}
            </Link>
            <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
              /
            </span>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <button
                className="px-4 flex gap-x-1 items-center"
                onClick={dropdowntogglerhandler}
              >
                <span>{item.name}</span>
                <MdKeyboardArrowDown />
              </button>
              <div
                className={`${
                  dropdown ? "block" : "hidden"
                } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
              >
                <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                  {item.items.map((page, index) => (
                    <Link
                      key={index}
                      to={page.href}
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      {page.title}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </li>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isnavvisible, setisnavvisible] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  // const userstate = useSelector((state) => state.user);
  const userstate = null;
  const navVisiblityHandler = () => {
    setisnavvisible((currstate) => {
      return !currstate;
    });
  };
  const logouthandler = () => {
    // dispatch(logout());
  };

  const dropdowntogglerhandler = () => {
    setdropdown((currstate) => {
      return !currstate;
    });
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-slate-100">
      <header className="container mx-auto px-5 flex justify-between py-9 items-center">
        <Link to="/">
          <img
            className="w-40 md:w-20"
            src={images?.Logo}
            alt="logo"
            width={98}

          />
        </Link>
        <div className="lg:hidden z-50">
          {isnavvisible ? (
            <>
              <AiOutlineClose
                className="w-6 h-6"
                onClick={navVisiblityHandler}
              />
            </>
          ) : (
            <>
              <AiOutlineMenu
                className="w-6 h-6"
                onClick={navVisiblityHandler}
              />
            </>
          )}
        </div>

        <div
          className={`${
            isnavvisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[200px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-9  lg:text-dark-soft flex flex-col lg:flex-row gap-x-4 font-semibold lg:text-2xl">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>

          {userstate?.userInfo ? (
            <>
              <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <button
                      className="px-4 flex gap-x-1 items-center"
                      onClick={dropdowntogglerhandler}
                    >
                      <span>Account</span>
                      <MdKeyboardArrowDown />
                    </button>
                    <div
                      className={`${
                        dropdown ? "block" : "hidden"
                      } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                    >
                      <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                        {userstate?.userinfo?.admin && (
                          <button
                            onClick={() => navigate("/admin")}
                            type="button"
                            className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                          >
                            Admin DashBoard
                          </button>
                        )}
                        <button
                          onClick={() => navigate("/profile")}
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        >
                          Profile
                        </button>
                        <button
                          onClick={logouthandler}
                          type="button"
                          className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
