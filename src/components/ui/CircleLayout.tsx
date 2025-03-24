"use client";

import Image from "next/image";

const item = [
  "/homepage/hero/swiper/Event 1.png",
  "/homepage/hero/swiper/Event 2.png",
  "/homepage/hero/swiper/Event 3.png",
  "/homepage/hero/swiper/Event 1.png",
  "/homepage/hero/swiper/Event 2.png",
  "/homepage/hero/swiper/Event 3.png",
  "/homepage/hero/swiper/Event 1.png",
];

const CircleLayout = () => {
  const viewportWidth = window.innerWidth;
  const baseWidth = 1440; // Lebar dasar untuk perhitungan (1440px)
  const parentSize = (2223 / baseWidth) * viewportWidth; // Diameter lingkaran besar
  const bigCircleRadius = parentSize / 2; // Radius lingkaran besar
  const smallCircleSize = (672 / baseWidth) * viewportWidth; // Diameter lingkaran kecil
  const smallCircleRadius = smallCircleSize / 2; // Radius lingkaran kecil

  const centerX = bigCircleRadius; // Pusat X lingkaran besar
  const centerY = bigCircleRadius; // Pusat Y lingkaran besar

  const smallCirclesCount = 7; // Maksimal 7 lingkaran kecil
  const angleIncrement = (2 * Math.PI) / smallCirclesCount; // Sudut antara setiap lingkaran kecil

  const smallCircles = item.slice(0, smallCirclesCount).map((item, index) => {
    // Mulai dari sudut -90 derajat (paling atas) dan berlanjut ke kanan
    const angle = index * angleIncrement - Math.PI / 2; // Sudut untuk setiap lingkaran kecil
    const x = centerX + (bigCircleRadius - smallCircleRadius) * Math.cos(angle); // Posisi X
    const y = centerY + (bigCircleRadius - smallCircleRadius) * Math.sin(angle); // Posisi Y

    return (
      <div
        key={index}
        className={`absolute rounded-full`}
        style={{
          width: smallCircleSize,
          height: smallCircleSize,
          left: x,
          top: y,
          transform: "translate(-50%, -50%)", // Pusatkan lingkaran kecil
        }}
      >
        <div className="w-full h-full relative">
          <Image
            src={item}
            alt="image"
            fill={true}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  });

  return (
    <div className="absolute top-338d left-0">
      <div
        className="relative rounded-full -translate-x-[17.6%] circle-container origin-center"
        style={{ width: parentSize, height: parentSize }}
      >
        {smallCircles}
      </div>
    </div>
  );
};

export default CircleLayout;
