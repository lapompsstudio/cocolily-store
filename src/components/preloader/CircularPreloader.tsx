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

interface LineCircleProps {
  className?: string;
}

const LineCircle: React.FC<LineCircleProps> = ({ className = "" }) => (
  <div
    className={`line-circle h-300d w-2d bg-ruby-red absolute inset-0 m-auto ${className}`}
  />
);

const BackgroundCircle: React.FC = () => (
  <div className="background-cirlce scale-0 h-300d w-300d bg-baby-pink rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="line-wrapper w-full h-full relative">
      <LineCircle />
      <LineCircle />
      <LineCircle />
      <LineCircle />
    </div>
  </div>
);

const CircleWrapper: React.FC = () => (
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
);

const CircularPreloader = () => {
  return (
    <div className="circle-outter relative -rotate-120">
      <BackgroundCircle />
      <CircleWrapper />
    </div>
  );
};

export default CircularPreloader;
