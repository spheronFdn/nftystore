import React from "react";

import FooterStyle from "../../styles/footer.module.css";

const Footer = () => {
  return (
    <nav className={FooterStyle.footer}>
      <span className={FooterStyle.footer__text}>
        © 2023 Spheron. All rights reserved
      </span>
    </nav>
  );
};

export default Footer;
