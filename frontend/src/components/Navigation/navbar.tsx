import React from "react";
import { ReactComponent as SpheronLogo } from "../../assets/icons/spheron-logo.svg";
import NavStyle from "../../styles/navigation.module.css";

const Navbar = () => {
  return (
    <nav className={NavStyle.navbar}>
      <SpheronLogo />
    </nav>
  );
};

export default Navbar;
