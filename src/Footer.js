import React from "react";
import "./styles.css";
import facebook from "./images/fbLogo.png";
import instagram from "./images/instagramLogo.png";
import twitter from "./images/twitterLogo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  //
  return (
    <>
      <footer>
        <div className="footer container">
          <div className="copyright">{`Copyright by Xenon ${year}`}</div>
          <div className="socialmedia">
            <a
              href="https://www.facebook.com/maynoothuniversity"
              target="_blank"
            >
              <img
                style={{ marginRight: "15px" }}
                src={facebook}
                alt="facebook"
              />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img
                style={{ marginRight: "15px" }}
                src={instagram}
                alt="instagram"
              />
            </a>
            <a href="https://x.com/home" target="_blank">
              <img src={twitter} alt="instagram" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
