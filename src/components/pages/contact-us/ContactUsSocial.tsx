import React from "react";

interface GradientImageProps {
  src: string;
  fitVariant?: "contain" | "cover" | "fill";
}

function GradientImage({ src, fitVariant }: GradientImageProps) {
  // Simple placeholder component since we don't have access to the actual GradientImage
  return (
    <img src={src} alt="Social icon" className="w-full h-full object-contain" />
  );
}

interface SocialIconProps {
  bgColor: string;
  iconSrc: string;
  rotation: string;
  topPosition: string;
}

function SocialIcon({
  bgColor,
  iconSrc,
  rotation,
  topPosition,
}: SocialIconProps) {
  return (
    <div className="relative w-225d h-225d group">
      <div
        className={`${bgColor} absolute ${topPosition} w-full h-full rounded-full 
                   flex flex-col justify-center items-center border-white border-10d
                   transition-transform duration-300 group-hover:scale-110`}
      >
        <div className={`relative w-78d h-78d ${rotation}`}>
          <GradientImage src={iconSrc} fitVariant="contain" />
        </div>
      </div>
    </div>
  );
}

function ContactUsSocial() {
  return (
    <div className="h-screen flex justify-center gap-49d items-center text-ruby-red font-bold bg-ivory-blush">
      <SocialIcon
        bgColor="bg-[#E1EDDD]"
        iconSrc="/icons/ig.svg"
        rotation="rotate-[-14.02deg]"
        topPosition="top-[-15%]"
      />

      <div className="flex flex-col justify-center items-center gap-60d">
        <h4 className="uppercase font-abc w-370d text-center">
          Follow Us on Social media
        </h4>
        <p className="text-12d font-normal text-center">
          Stay in the loop for our latest treats, behind-the-scenes moments, and
          all things chocolatey.
        </p>
      </div>

      <SocialIcon
        bgColor="bg-[#F1ECCE]"
        iconSrc="/icons/tiktok.svg"
        rotation="rotate-[14.02deg]"
        topPosition="top-[15%]"
      />
    </div>
  );
}

export default ContactUsSocial;
