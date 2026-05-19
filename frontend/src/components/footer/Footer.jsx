import Nav_items from "../nav/Nav_items";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 flex justify-between px-60 items-center">
        <div className="flex flex-col gap-y-2 text-xs text-gray-500 ">
          <p className="">All The Rights Are Reserved</p>
          <p className="">WeebVault @2026</p>
        </div>

        <nav className="flex flex-col gap-x-2.5">
          <NavLink
            to="/"
            className="text-xs text-gray-500  hover:text-gray-200 duration-200"
          >
            Home
          </NavLink>
          <Nav_items className="text-xs" />
        </nav>
      </footer>
    </>
  );
}
