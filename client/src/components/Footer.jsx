import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-name">© 2021 raed ghodhbane</div>
      <div className="footer-email">
        {" "}
        <a href="mailTo:raed.ghodhbane@estiam.com" className="href">
          <i className="fas fa-envelope"></i>raed.ghodhbane@estiam.com{" "}
        </a>
        ​
      </div>
    </div>
  );
}
