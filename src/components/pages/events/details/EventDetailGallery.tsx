import GradientImage from "@/components/ui/GradientImage";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

gsap.registerPlugin(ScrollTrigger);

// Interfaces untuk type safety
interface GalleryItem {
  id: number;
  image: string;
  text: string;
}

interface SlideStyles {
  containerClass: string;
  containerStyle: React.CSSProperties;
  contentClass: string;
  textClass: string;
}

interface ScatteredConfig {
  left?: string;
  right?: string;
  x: string;
  rotate: string;
}

interface AlignedConfig {
  left?: string;
  right?: string;
  x: string;
  rotate: string;
  y?: string;
  width?: string;
  height?: string;
}

interface InitialPosition {
  left?: string;
  right?: string;
  x: string;
}

export default function EventDetailGallery() {
  const container = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Data dinamis untuk gambar dan teks
  const galleryItems: GalleryItem[] = [
    { id: 1, image: "/images/event-details/our-images/1.png", text: "TENNIS" },
    { id: 2, image: "/images/event-details/our-images/2.png", text: "TENNIS" },
    { id: 3, image: "/images/event-details/our-images/3.png", text: "TENNIS" },
    { id: 4, image: "/images/event-details/our-images/4.png", text: "TENNIS" },
    { id: 5, image: "/images/event-details/our-images/5.png", text: "TENNIS" },
    { id: 6, image: "/images/event-details/our-images/1.png", text: "TENNIS" },
    { id: 7, image: "/images/event-details/our-images/2.png", text: "TENNIS" },
    { id: 8, image: "/images/event-details/our-images/3.png", text: "TENNIS" },
    { id: 9, image: "/images/event-details/our-images/4.png", text: "TENNIS" },
    { id: 10, image: "/images/event-details/our-images/5.png", text: "TENNIS" },
    // Tambahkan lebih banyak item jika diperlukan
  ];

  // Konfigurasi untuk animasi gambar acak
  const scatteredConfig: ScatteredConfig[] = [
    { left: "10%", x: "10%", rotate: "-15deg" },
    { left: "1%", x: "1%", rotate: "15deg" },
    { left: "-3.3%", x: "-3.3%", rotate: "-5.23deg" },
    { right: "20%", x: "20%", rotate: "11.08deg" },
    { right: "35%", x: "35%", rotate: "30deg" },
  ];

  // Konfigurasi untuk posisi awal gambar
  const initialPositions: InitialPosition[] = [
    { left: "38.4%", x: "38.4%" },
    { left: "15.2%", x: "15.2%" },
    { left: "-8%", x: "-8%" },
    { right: "31.2%", x: "31.2%" },
    { right: "54.4%", x: "54.4%" },
  ];

  // Konfigurasi untuk posisi akhir gambar
  const alignedConfig: AlignedConfig[] = [
    { left: "0%", x: "0%", rotate: "0deg", y: "29%" },
    { left: "0%", x: "-15%", rotate: "0deg", width: "100%", height: "441px" },
    { left: "0%", x: "0%", rotate: "0deg", y: "10%" },
    { right: "0%", x: "-15%", rotate: "0deg", width: "100%", height: "441px" },
    { right: "0%", x: "0%", rotate: "0deg", y: "10%" },
  ];

  useGSAP(
    () => {
      // Timeline untuk animasi awal (muncul berserakan)
      const tlScattered = gsap.timeline({
        scrollTrigger: {
          trigger: ".container-event-detail-gallery",
          start: "30% bottom",
          end: "bottom bottom",
          onEnter: () => tlScattered.play(),
        },
        paused: true,
      });

      // Initial state - scaled dan opacity 0
      tlScattered.fromTo(
        ".container-images-event-details",
        { scale: 1.5, opacity: 0, y: "10%" },
        {
          scale: 1,
          opacity: 1,
          y: "0%",
          ease: "power1.out",
          duration: 0.8,
        }
      );

      // Animasi berserakan untuk semua gambar sekaligus
      for (let i = 0; i < 5; i++) {
        const selector = `.container-image-event-detail-${i + 1}`;
        const config = scatteredConfig[i];

        tlScattered.to(
          selector,
          {
            ease: "power1.out",
            ...config,
            duration: 0.6,
          },
          "<"
        );
      }

      // Timeline untuk posisi sejajar
      const tlAligned = gsap.timeline({
        scrollTrigger: {
          trigger: ".container-event-detail-gallery",
          start: "60% center",
          // markers: true,
          onEnter: () => tlAligned.play(),
        },
        paused: true,
      });

      // Animasi posisi sejajar untuk semua gambar
      for (let i = 0; i < 5; i++) {
        const containerSelector = `.container-image-event-detail-${i + 1}`;
        const contentSelector = `.content-image-event-detail-${i + 1}`;
        const config = alignedConfig[i];

        // Pisahkan konfigurasi untuk container dan content
        const containerConfig = { ...config };
        const contentConfig: any = {};

        // Pindahkan width dan height ke contentConfig jika ada
        if (containerConfig.width) {
          contentConfig.width = containerConfig.width;
          delete containerConfig.width;
        }

        if (containerConfig.height) {
          contentConfig.height = containerConfig.height;
          delete containerConfig.height;
        }

        // Animasi untuk container
        tlAligned.to(
          containerSelector,
          {
            ease: "power1.inOut",
            ...containerConfig,
            duration: 0.8,
          },
          "<"
        );

        // Animasi untuk content jika ada perubahan width/height
        if (Object.keys(contentConfig).length > 0) {
          tlAligned.to(
            contentSelector,
            {
              ...contentConfig,
              duration: 0.8,
            },
            "<"
          );
        }
      }

      // Animasi teks
      tlAligned.to(
        ".text-anim-image",
        {
          ease: "power1.inOut",
          opacity: 1,
          y: "0%",
          duration: 0.6,
          onComplete: () => {
            console.log("Animation completed!");
            if (swiperRef.current) {
              swiperRef.current.autoplay.start();
            }
          },
        },
        "<0.2"
      );
    },
    { scope: container, dependencies: [] }
  );

  // Fungsi untuk mendapatkan styling berdasarkan indeks
  const getSlideStyles = (index: number): SlideStyles => {
    const itemCycle = index % 5; // Untuk mengulangi pola setiap 5 item
    const isFirstGroup = index < 5;

    if (isFirstGroup) {
      return {
        containerClass: `opacity-1 container-image-event-detail-${index + 1} !w-[325px] !h-[60vh] relative z-${40 - index * 10} shrink-0 opacity-1`,
        containerStyle: initialPositions[index],
        contentClass: `w-[216px] h-[294px] content-image-event-detail-${index + 1} relative rounded-32d overflow-hidden`,
        textClass: "text-12d opacity-0 text-anim-image translate-y-full",
      };
    } else {
      // Untuk slide 6-10 dan seterusnya
      const style = alignedConfig[itemCycle];
      let containerClass = "!w-[325px] !h-[60vh] relative";
      let containerStyle: React.CSSProperties = {};
      let contentClass = "relative rounded-32d overflow-hidden";

      // Z-index sesuai dengan pola
      containerClass += ` z-${40 - itemCycle * 10} shrink-0 opacity-1`;

      // Styling sesuai dengan posisi yang diinginkan
      if (style.y) {
        containerClass += ` translate-y-[${style.y}] top-[${style.y}]`;
      }

      if (style.x && style.x === "-15%") {
        containerClass += " !translate-x-[-15%]";
      }

      // Ukuran content untuk posisi tertentu
      if (itemCycle === 1 || itemCycle === 3) {
        contentClass += " w-full h-[441px]";
      } else {
        contentClass += " w-[216px] h-[294px]";
      }

      return {
        containerClass,
        containerStyle,
        contentClass,
        textClass: "text-12d",
      };
    }
  };

  return (
    <div ref={container}>
      <div className="relative w-full h-screen text-ruby-red container-event-detail-gallery overflow-hidden">
        <div className="relative z-10 pt-[15vh]">
          <p className="font-abc uppercase px-20d">OUR GALLERY</p>
          <p className="font-abc uppercase absolute top-[15vh] left-1/2 -translate-x-1/2">
            COCOLILY COUNTRY CLUB's
          </p>
          <h2 className="font-span font-bold w-full text-center mt-20d">
            Sweet Memories
          </h2>
        </div>

        <Swiper
          className="w-full h-[60vh] !px-20d !overflow-visible container-images-event-details !absolute !bottom-0 opacity-0 translate-y-[10%] scale-150"
          slidesPerView={"auto"}
          loop
          autoplay={
            {
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              enabled: false,
            } as any
          }
          speed={4000}
          modules={[Autoplay]}
          style={
            {
              "--swiper-wrapper-transition-timing-function": "linear",
            } as React.CSSProperties
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {galleryItems.map((item, index) => {
            const styles = getSlideStyles(index);

            return (
              <SwiperSlide
                key={item.id}
                className={styles.containerClass}
                style={styles.containerStyle}
              >
                <div className="relative space-y-12d w-full h-full">
                  <div className={styles.contentClass}>
                    <GradientImage src={item.image} />
                  </div>
                  <p className={styles.textClass}>{item.text}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
