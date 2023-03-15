import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpheronLogo } from "../../assets/icons/spheron-logo.svg";
import NavStyle from "../../styles/navigation.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={NavStyle.navbar}>
      <div onClick={() => navigate("/")} className={NavStyle.logo}>
        <SpheronLogo />
      </div>
    </nav>
  );
};

export default Navbar;
