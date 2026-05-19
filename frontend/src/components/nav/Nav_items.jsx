import { NavLink } from "react-router-dom";

export default function Nav_items({ className }) {
  return (
    <>
      <NavLink
        to="/anime"
        className={`text-sm text-gray-500  hover:text-gray-200 duration-200 ${className}`}
      >
        Anime
      </NavLink>
      <NavLink
        to="/manga"
        className={`text-sm text-gray-500  hover:text-gray-200 duration-200 ${className}`}
      >
        Manga
      </NavLink>
      <NavLink
        to="/movie"
        className={`text-sm text-gray-500  hover:text-gray-200 duration-200 ${className}`}
      >
        Movie
      </NavLink>
      <NavLink
        to="/tv"
        className={`text-sm text-gray-500  hover:text-gray-200 duration-200 ${className}`}
      >
        Tv
      </NavLink>
    </>
  );
}
