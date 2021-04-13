import React from "react";
import Niki from "../../assets/img/niki.jpeg";
import Jessica from "../../assets/img/jessica.jpeg";
import Jon from "../../assets/img/jon.jpeg";
import Truss from "../../assets/img/truss.jpeg";
import "./style.css";

function Footer() {
  return (
    <div className="holder">
      <h3 id="footTitle">Made With &#10084; By:</h3>
      <h4 id="contributors">
        <a href="https://github.com/nsc9605">
          <img alt="Nicole Catapano" src={Niki} title="Nicole Catapano" className="authorImg round" />
         </a>
        <a href="https://github.com/deck-jessica">
          <img alt="Jessica Deck" title="Jessica Deck" src={Jessica} className="authorImg round" />
         </a>
        <a href="https://github.com/JonGudenzi">
          <img alt="Jon Gudenzi" src={Jon} title="Jon Gudenzi" className="authorImg round" />
         </a>
        <a href="https://github.com/treyjewett">
          <img alt="Russell Jewett" src={Truss} title="Russell Jewett" className="authorImg round" />
         </a>
      </h4>
    </div>

// {/* <a href="https://github.com/nsc9605">Niki</a>, */}
  // {/* <a href="https://github.com/deck-jessica"> Jessica</a>,
  // <a href="https://github.com/JonGudenzi"> Jon</a>, and{" "}
  // <a href="https://github.com/treyjewett">Russell</a> */}
  );
}

export default Footer;
