import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ArrowButton from "@/components/ui/ArrowButton";
import Image from "next/image";
import clsx from "clsx";

const datas = [
  {
    image: "/homepage/hero/swiper/Event 1.png",
    name: "image 1",
  },
  {
    image: "/homepage/hero/swiper/Event 2.png",
    name: "image 2",
  },
  {
    image: "/homepage/hero/swiper/Event 3.png",
    name: "image 3",
  },
  {
    image: "/homepage/hero/swiper/Event 4.png",
    name: "image 4",
  },
];

function getVisibleItems(array: any[], startIndex: number, itemsPerView = 5) {
  return Array.from(
    { length: itemsPerView },
    (_, i) => array[(startIndex + i) % array.length]
  );
}

const CircleSlider = () => {
  const totalChildren = 6;
  const circleRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arraySlice, setArraySlice] = useState<any[][]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [datasFinal, setDataFinal] = useState([{}]);

  useEffect(() => {
    console.log({ currentIndex, datas });
    console.log(datas.length - 1 - currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const tempArray: number[][] = [];

    for (let i = 0; i < datas.length; i++) {
      tempArray.push(getVisibleItems(datas, i));
    }

    setArraySlice(tempArray);
  }, []);

  //   useEffect(() => {
  //     if (datas.length <= 6) {
  //       datas.forEach((data) => {
  //         if (datas.length < 6) {
  //           datas.push(data);
  //         }
  //       });

  //       console.log({ datas });
  //     }
  //   }, [datas]);

  useEffect(() => {
    // Update ukuran radius berdasarkan lebar layar
    const updateRadius = () => {
      const baseWidth = 1440;
      const viewportWidth = window.innerWidth;
      setRadius((680 / baseWidth) * viewportWidth);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const rotateCircle = (direction: any) => {
    if (direction === "next") {
      setCurrentIndex(currentIndex + 1);
      setImageUrl(datas[datas.length - 1 - currentIndex].image);
    }

    const newRotation =
      rotation +
      (direction === "next" ? 360 / totalChildren : -360 / totalChildren);
    setRotation(newRotation);

    gsap.to(circleRef.current, {
      rotate: newRotation,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        // if (direction === "next") {
        //   if (datas.length - 1 !== currentIndex)
        //   else {
        //     setCurrentIndex(currentIndex + 1);
        //   }
        // } else {
        //   setCurrentIndex(currentIndex - 1);
        // }
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {/* Lingkaran Parent */}
      <div className="w-2223d h-2223d rounded-full flex items-center justify-center relative overflow-hidden ">
        <div
          ref={circleRef}
          className="absolute w-full h-full flex items-center justify-center"
          style={{ transformOrigin: "center" }}
        >
          {(() => {
            const items = [];
            for (let i = 0; i < 6; i++) {
              const angle = (i / totalChildren) * 360;
              items.push(
                <div
                  key={i}
                  className={clsx(
                    `absolute w-672d h-672d rounded-full flex items-center justify-center text-white font-bold circle-item-${i}`
                  )}
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(0deg)`,
                  }}
                >
                  {datas[i] ? (
                    <div className="w-full h-full rounded-full relative">
                      <Image
                        src={datas[i].image} // Pastikan datas memiliki elemen minimal 6
                        alt="image"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full relative ">
                      <Image
                        src={
                          imageUrl && 6 - 1 - currentIndex === i
                            ? imageUrl
                            : datas[datas.length - 1].image
                        } // Pastikan datas memiliki elemen minimal 6
                        alt="image"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            }
            return items;
          })()}
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div
        className="absolute left-365d top-387d z-10"
        onClick={() => rotateCircle("prev")}
      >
        <ArrowButton icon="arrow-left" />
      </div>
      <div
        className="absolute right-365d top-387d z-10"
        onClick={() => rotateCircle("next")}
      >
        <ArrowButton />
      </div>
    </div>
  );
};

export default CircleSlider;
