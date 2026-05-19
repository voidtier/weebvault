import Nav from "../components/nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer.jsx";

function Base() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default Base;
