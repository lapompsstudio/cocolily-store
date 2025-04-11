import React from "react";

export default function WeCareSection() {
  return (
    <div className="w-full h-screen bg-[#E0C7E6] relative text-ruby-red overflow-hidden">
      <div className="absolute top-0 z-0 pointer-events-none w-full h-full">
        <div className="w-[217px] h-[271px] absolute top-[-20%] rounded-32d bg-white left-[20%]"></div>
        <div className="w-[217px] h-[271px] absolute top-[10%] rounded-32d bg-white right-[20%]"></div>
        <div className="w-[217px] h-[271px] absolute bottom-[10%] rounded-32d bg-white left-[2%]"></div>
        <div className="w-[217px] h-[271px] absolute bottom-[0%] rounded-32d bg-white right-[2%]"></div>
      </div>
      <div className="absolute top-0 w-full h-[10vh] z-10 bg-gradient-to-b from-baby-pink"></div>
      <div className="flex flex-col justify-center items-center w-full h-full gap-80d z-10 relative">
        <p className="uppercase">WHAT DO We CARE ABOUT?</p>
        <div className="text-center">
          <h3 className="tracking-tight text-64d font-span">
            <span className="italic">Creating</span>
            <span className="font-bold"> memorable</span>
          </h3>
          <h3 className="tracking-tight text-64d font-span">
            chocolate-centered
          </h3>
          <h3 className="tracking-tight text-64d font-span">
            <span className="font-bold">experiences,</span>{" "}
            <span className="italic">and</span>{" "}
            <span className="font-bold">taking</span> you
          </h3>
          <h3 className="tracking-tight text-64d font-span">
            on a <span className="font-bold">journey</span> where{" "}
            <span className="italic">you</span>{" "}
            <span className="font-bold">can</span>
          </h3>
          <h3 className="tracking-tight text-64d font-span">
            <span className="italic">indulge</span> in a{" "}
            <span className="font-bold">different</span> journey
          </h3>
          <h3 className="tracking-tight text-64d font-span">
            every <span className="italic">time.</span>
          </h3>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[10vh] z-10 bg-gradient-to-t from-baby-pink"></div>
    </div>
  );
}
