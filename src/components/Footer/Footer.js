// import React from "react";
import "./Footer.css";

function Footer() {
  // Dynamically update year
  const today = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Freddy Perez-Camacho</p>
      <p className="footer__text">{today.getFullYear()}</p>
    </footer>
  );
}

export default Footer;
