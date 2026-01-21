import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import useTheme from "../hooks/use-theme";
import { NavLink } from "react-router";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    isButton: true,
  },
];
export const Navbar = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-slate-800 text-white py-2 px-5 md:px-20 flex items-center justify-between sticky top-0 z-10">
        <div
          className={`text-2xl font-bold ${theme === "dark" ? "text-orange-500" : "text-white"}`}
        >
          SwithShop
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 max-md:hidden">
            {navItems.map((item) => (
              <Fragment key={item.href}>
                {item.isButton ? (
                  <button className="text-sm cursor-pointer bg-cyan-800 hover:bg-cyan-700 rounded-md px-4 p-2">
                    {item.name}
                  </button>
                ) : (
                  <NavLink to={item.href} className="text-sm text-slate-300 hover:text-slate-50 cursor-pointer hover:underline">
                    {item.name}
                  </NavLink>
                )}
              </Fragment>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="text-sm cursor-pointer border border-cyan-800  rounded-md size-10 flex items-center justify-center"
          >
            <SunIcon
              size={20}
              className={`transition-all ${theme == "dark" ? "scale-0" : "scale-100"} absolute`}
            />
            <MoonIcon
              size={20}
              className={`transition-all ${theme == "dark" ? "scale-100" : "scale-0"} absolute`}
            />
          </button>
          <button
            onClick={() => setisSidebarOpen(true)}
            className="md:hidden text-sm cursor-pointer border border-cyan-800  rounded-md size-10 flex items-center justify-center"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`z-10  opacity-0.9 fixed inset-0 bg-black/20 md:hidden ${!isSidebarOpen ? "hidden" : ""}`}
        onClick={() => setisSidebarOpen(false)}
      ></div>
      <div
        className={`z-10 absolute top-0 bottom-0 bg-slate-100 w-50 transition-all md:-left-50 ${isSidebarOpen ? "left-0 " : "-left-50"}`}
      >
        <div className="text-2xl font-bold text-center py-5">SwithShop</div>
        <div className="flex flex-col gap-2 px-3">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="hover:bg-gray-300 rounded-md p-1 px-2 cursor-pointer"
              onClick={() => setisSidebarOpen(false)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
