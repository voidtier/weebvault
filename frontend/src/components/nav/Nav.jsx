import Nav_items from "./Nav_items";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="flex items-center px-5 py-2.5 bg-gray-900 border-b border-gray-700 sticky top-0 z-1000 w-full">
        <NavLink className=" mr-auto text-[24px] text-gray-500  hover:text-gray-200 duration-200">
          Home
        </NavLink>
        <div className="flex gap-x-2.5 hover:text-gray-300 active:text-gray-200">
          <Nav_items />
        </div>
      </nav>
    </>
  );
}
