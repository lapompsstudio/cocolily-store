"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import clsx from "clsx";

import Button from "@/components/ui/button";

const datas = [1, 2, 3, 4, 5, 6, 7, 8];
const datas2 = [1, 2, 3, 4, 5, 6, 7];

const EventsList = () => {
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {}, []);

  return (
    <section
      className={clsx(
        "text-ruby-red text-96d relative min-h-screen md:landscape:pb-60d"
      )}
    >
      <div className="w-full h-264d bg-gradient-to-t from-transparent to-pale-sky-blue absolute top-0 left-0"></div>

      <div className="md:landscape:px-20d md:landscape:pt-114d z-10 relative">
        <h4 className="font-abc font-bold md:landscape:text-16d">
          COCOLILY’s <br />
          COLLABORATION EVENT lIST
        </h4>

        <div className="grid grid-cols-2 mt-30d">
          <div className="w-full">
            <Button
              showIcon
              variant="secondary"
              className={clsx(
                `uppercase h-full font-abc text-16d button-shop w-full`,
                {
                  active: activeButton === 0,
                }
              )}
              onClick={() => setActiveButton(0)}
            >
              all events
            </Button>
          </div>

          <div className="w-full">
            <Button
              showIcon
              variant="secondary"
              className={clsx(
                `uppercase h-full font-abc text-16d button-shop w-full`,
                {
                  active: activeButton === 1,
                }
              )}
              onClick={() => setActiveButton(1)}
            >
              upcoming events
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-x-20d gap-y-64d md:landscape:mt-100d ">
          {activeButton === 0
            ? datas.map((_, index) => (
                <div
                  className={clsx(
                    "w-full flex flex-col gap-y-36d relative",
                    "cursor-follow-active"
                  )}
                  key={index}
                >
                  <div className="w-full h-344d rounded-32d relative overflow-hidden">
                    <div className="px-22d py-12d rounded-32d bg-ruby-red uppercase absolute top-20d left-20d z-10 text-white text-12d font-sans font-semibold">
                      ONGOING NOW
                    </div>
                    <Image
                      src={"/homepage/hero/swiper/Event 1.png"}
                      fill
                      alt="collaboration image"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-217d h-217d">
                        <Image
                          src={"/homepage/hero/swiper/Logo.png"}
                          fill
                          alt="collaboration image"
                          className="h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-24d">
                    <div className="font-span md:landscape:text-48d leading-none font-bold">
                      Cocolily Country Club
                    </div>

                    <div className="flex gap-x-20d">
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : datas2.map((_, index) => (
                <div
                  className={clsx(
                    "w-full flex flex-col gap-y-36d",
                    "cursor-follow-active"
                  )}
                  key={index}
                >
                  <div className="w-full h-344d rounded-32d relative overflow-hidden">
                    <Image
                      src={"/homepage/hero/swiper/Event 1.png"}
                      fill
                      alt="collaboration image"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-217d h-217d">
                        <Image
                          src={"/homepage/hero/swiper/Logo.png"}
                          fill
                          alt="collaboration image"
                          className="h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-24d">
                    <div className="font-span md:landscape:text-48d leading-none font-bold">
                      Cocolily Country Club
                    </div>

                    <div className="flex gap-x-20d">
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                      <div className="py-8d px-12d rounded-32d border-[1px] border-ruby-red font-sans text-10d">
                        COCOA BAR
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default EventsList;
