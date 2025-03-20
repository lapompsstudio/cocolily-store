import React from "react";
import {
  Circle1,
  Circle2,
  Circle3,
  Circle4,
  Circle5,
  Circle6,
  Circle7,
  Circle8,
} from "../icons/circle";
import "./preloader.css";

const CircularPreloader = () => {
  return (
    <div className="circle-outter relative -rotate-120">
      <div className="background-cirlce scale-0 h-[300px] w-[300px] bg-baby-pink rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="line-wrapper w-full h-full relative">
          <div className="line-circle h-[300px] w-[2px] bg-ruby-red absolute inset-0 m-auto"></div>
          <div className="line-circle h-[300px] w-[2px] bg-ruby-red absolute inset-0 m-auto"></div>
          <div className="line-circle h-[300px] w-[2px] bg-ruby-red absolute inset-0 m-auto"></div>
          <div className="line-circle h-[300px] w-[2px] bg-ruby-red absolute inset-0 m-auto"></div>
        </div>
      </div>
      <div className="circle-wrapper">
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
        <Circle5 />
        <Circle6 />
        <Circle7 />
        <Circle8 />
      </div>
    </div>
  );
};

export default CircularPreloader;
