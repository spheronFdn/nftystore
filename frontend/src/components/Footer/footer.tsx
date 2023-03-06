import React from "react";

import FooterStyle from "../../styles/footer.module.css";

const Footer = () => {
  const year = new Date();
  const currentYear = year.getFullYear();

  return (
    <nav className={FooterStyle.footer}>
      <span className={FooterStyle.footer__text}>
        © {currentYear} Spheron. All rights reserved
      </span>
    </nav>
  );
};

export default Footer;
