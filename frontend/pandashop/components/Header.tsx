import React from "react";
import One from "./images/one.png";
import Two from "./images/two.png";
import Three from "./images/three.png";
import Four from "./images/four.png";
import Five from "./images/five.png";
import Image from "next/image";
import Icon from "./images/icon.png";
export const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="">
          <Image src={One} alt="" />
          <Image src={Two} alt="" />
          <Image src={Three} alt="" />
          <Image src={Four} alt="" />
          <Image src={Five} alt="" />
        </div>
        <div className="">
          <Image src={Icon} alt="" />
        </div>
      </div>
      {/* <div className="header-right">
      <Image src={Icon} alt=""/>
  
      </div> */}
    </div>
  );
};
