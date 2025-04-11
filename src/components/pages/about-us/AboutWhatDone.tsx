"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ArrowButton from "@/components/ui/ArrowButton";

const AboutWhatDone = () => {
  return (
    <section className="w-full bg-baby-pink md:landscape:pt-142d font-bold text-ruby-red md:landscape:px-20d">
      <div className="w-full grid md:landscape:grid-cols-12">
        <div className="md:landscape:col-span-3">
          <div className="uppercase font-abc font-bold md:landscape:text-16d">
            beyond chocolate
          </div>

          <div className="md:landscape:mt-60d flex flex-col gap-y-16d">
            <div className="flex items-center gap-x-16d">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6091 11.3924C10.1226 11.4472 9.66923 11.6655 9.32309 12.0116C8.97696 12.3578 8.75864 12.8112 8.70388 13.2976C8.60219 13.3154 8.49913 13.3243 8.39588 13.324C5.84388 13.3548 3.77148 11.0008 3.77148 11.0008C3.77148 11.0008 5.84388 8.64683 8.39588 8.68203C8.49892 8.68263 8.60181 8.68998 8.70388 8.70403C8.75864 9.19047 8.97696 9.64389 9.32309 9.99002C9.66923 10.3362 10.1226 10.5545 10.6091 10.6092C10.648 10.8688 10.648 11.1328 10.6091 11.3924Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3222 8.39979C13.3222 8.50099 13.3222 8.59779 13.3222 8.69899C12.8321 8.74983 12.374 8.96633 12.0236 9.31273C11.6732 9.65914 11.4514 10.1147 11.395 10.6042C11.1343 10.6482 10.8681 10.6482 10.6074 10.6042C10.5511 10.1183 10.3323 9.66577 9.98644 9.31993C9.6406 8.97408 9.18803 8.75527 8.70218 8.69899C8.6861 8.60009 8.67874 8.49998 8.68018 8.39979C8.64058 5.83899 10.999 3.77539 10.999 3.77539C10.999 3.77539 13.3574 5.83899 13.3222 8.39979Z"
                  fill="#C92539"
                />
                <path
                  d="M18.2295 11.0009C18.2295 11.0009 16.1615 13.3593 13.6051 13.3285C13.5047 13.3287 13.4046 13.3198 13.3059 13.3021C13.2486 12.8159 13.0289 12.3633 12.6824 12.0175C12.3358 11.6717 11.8826 11.453 11.3963 11.3969C11.3523 11.1362 11.3523 10.87 11.3963 10.6093C11.8826 10.5532 12.3358 10.3346 12.6824 9.98879C13.0289 9.64301 13.2486 9.19035 13.3059 8.70413C13.405 8.69008 13.505 8.68273 13.6051 8.68213C16.1615 8.64253 18.2295 11.0009 18.2295 11.0009Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3227 13.6012C13.3579 16.1576 10.9995 18.2256 10.9995 18.2256C10.9995 18.2256 8.63667 16.1576 8.67627 13.6012C8.67469 13.4995 8.68205 13.3979 8.69827 13.2976C9.18442 13.242 9.63741 13.0235 9.9834 12.6775C10.3294 12.3315 10.548 11.8785 10.6035 11.3924C10.8642 11.3484 11.1304 11.3484 11.3911 11.3924C11.4468 11.8792 11.666 12.3327 12.0129 12.6787C12.3597 13.0248 12.8137 13.243 13.3007 13.2976C13.3139 13.3988 13.3227 13.4956 13.3227 13.6012Z"
                  fill="#C92539"
                />
              </svg>
              <div className="uppercase font-bold md:landscape:text-11d">
                seasonal pop-ups
              </div>
            </div>
            <div className="flex items-center gap-x-16d">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6091 11.3924C10.1226 11.4472 9.66923 11.6655 9.32309 12.0116C8.97696 12.3578 8.75864 12.8112 8.70388 13.2976C8.60219 13.3154 8.49913 13.3243 8.39588 13.324C5.84388 13.3548 3.77148 11.0008 3.77148 11.0008C3.77148 11.0008 5.84388 8.64683 8.39588 8.68203C8.49892 8.68263 8.60181 8.68998 8.70388 8.70403C8.75864 9.19047 8.97696 9.64389 9.32309 9.99002C9.66923 10.3362 10.1226 10.5545 10.6091 10.6092C10.648 10.8688 10.648 11.1328 10.6091 11.3924Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3222 8.39979C13.3222 8.50099 13.3222 8.59779 13.3222 8.69899C12.8321 8.74983 12.374 8.96633 12.0236 9.31273C11.6732 9.65914 11.4514 10.1147 11.395 10.6042C11.1343 10.6482 10.8681 10.6482 10.6074 10.6042C10.5511 10.1183 10.3323 9.66577 9.98644 9.31993C9.6406 8.97408 9.18803 8.75527 8.70218 8.69899C8.6861 8.60009 8.67874 8.49998 8.68018 8.39979C8.64058 5.83899 10.999 3.77539 10.999 3.77539C10.999 3.77539 13.3574 5.83899 13.3222 8.39979Z"
                  fill="#C92539"
                />
                <path
                  d="M18.2295 11.0009C18.2295 11.0009 16.1615 13.3593 13.6051 13.3285C13.5047 13.3287 13.4046 13.3198 13.3059 13.3021C13.2486 12.8159 13.0289 12.3633 12.6824 12.0175C12.3358 11.6717 11.8826 11.453 11.3963 11.3969C11.3523 11.1362 11.3523 10.87 11.3963 10.6093C11.8826 10.5532 12.3358 10.3346 12.6824 9.98879C13.0289 9.64301 13.2486 9.19035 13.3059 8.70413C13.405 8.69008 13.505 8.68273 13.6051 8.68213C16.1615 8.64253 18.2295 11.0009 18.2295 11.0009Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3227 13.6012C13.3579 16.1576 10.9995 18.2256 10.9995 18.2256C10.9995 18.2256 8.63667 16.1576 8.67627 13.6012C8.67469 13.4995 8.68205 13.3979 8.69827 13.2976C9.18442 13.242 9.63741 13.0235 9.9834 12.6775C10.3294 12.3315 10.548 11.8785 10.6035 11.3924C10.8642 11.3484 11.1304 11.3484 11.3911 11.3924C11.4468 11.8792 11.666 12.3327 12.0129 12.6787C12.3597 13.0248 12.8137 13.243 13.3007 13.2976C13.3139 13.3988 13.3227 13.4956 13.3227 13.6012Z"
                  fill="#C92539"
                />
              </svg>
              <div className="uppercase font-bold md:landscape:text-11d">
                Menu Development
              </div>
            </div>
            <div className="flex items-center gap-x-16d">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6091 11.3924C10.1226 11.4472 9.66923 11.6655 9.32309 12.0116C8.97696 12.3578 8.75864 12.8112 8.70388 13.2976C8.60219 13.3154 8.49913 13.3243 8.39588 13.324C5.84388 13.3548 3.77148 11.0008 3.77148 11.0008C3.77148 11.0008 5.84388 8.64683 8.39588 8.68203C8.49892 8.68263 8.60181 8.68998 8.70388 8.70403C8.75864 9.19047 8.97696 9.64389 9.32309 9.99002C9.66923 10.3362 10.1226 10.5545 10.6091 10.6092C10.648 10.8688 10.648 11.1328 10.6091 11.3924Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3222 8.39979C13.3222 8.50099 13.3222 8.59779 13.3222 8.69899C12.8321 8.74983 12.374 8.96633 12.0236 9.31273C11.6732 9.65914 11.4514 10.1147 11.395 10.6042C11.1343 10.6482 10.8681 10.6482 10.6074 10.6042C10.5511 10.1183 10.3323 9.66577 9.98644 9.31993C9.6406 8.97408 9.18803 8.75527 8.70218 8.69899C8.6861 8.60009 8.67874 8.49998 8.68018 8.39979C8.64058 5.83899 10.999 3.77539 10.999 3.77539C10.999 3.77539 13.3574 5.83899 13.3222 8.39979Z"
                  fill="#C92539"
                />
                <path
                  d="M18.2295 11.0009C18.2295 11.0009 16.1615 13.3593 13.6051 13.3285C13.5047 13.3287 13.4046 13.3198 13.3059 13.3021C13.2486 12.8159 13.0289 12.3633 12.6824 12.0175C12.3358 11.6717 11.8826 11.453 11.3963 11.3969C11.3523 11.1362 11.3523 10.87 11.3963 10.6093C11.8826 10.5532 12.3358 10.3346 12.6824 9.98879C13.0289 9.64301 13.2486 9.19035 13.3059 8.70413C13.405 8.69008 13.505 8.68273 13.6051 8.68213C16.1615 8.64253 18.2295 11.0009 18.2295 11.0009Z"
                  fill="#C92539"
                />
                <path
                  d="M13.3227 13.6012C13.3579 16.1576 10.9995 18.2256 10.9995 18.2256C10.9995 18.2256 8.63667 16.1576 8.67627 13.6012C8.67469 13.4995 8.68205 13.3979 8.69827 13.2976C9.18442 13.242 9.63741 13.0235 9.9834 12.6775C10.3294 12.3315 10.548 11.8785 10.6035 11.3924C10.8642 11.3484 11.1304 11.3484 11.3911 11.3924C11.4468 11.8792 11.666 12.3327 12.0129 12.6787C12.3597 13.0248 12.8137 13.243 13.3007 13.2976C13.3139 13.3988 13.3227 13.4956 13.3227 13.6012Z"
                  fill="#C92539"
                />
              </svg>
              <div className="uppercase font-bold md:landscape:text-11d">
                merchandise
              </div>
            </div>
          </div>
        </div>
        <div className="md:landscape:col-start-5 md:landscape:col-span-8 border-ruby-red border-t-[1px]">
          <div className="mt-16d font-abc font-bold text-16d uppercase">
            Seasonal Pop-ups
          </div>

          <div className="mt-60d font-abc font-bold text-32d uppercase leading-none">
            In the world of pop-ups, we’ve developed Cocoa Bar & Ice Bar, two
            dessert and beverage concepts tailored to summer and winter. Each
            season, they reappear with a completely new look and menu, giving
            customers something different to look forward to every season.
          </div>

          <div className="mt-90d">
            <Swiper slidesPerView={3} spaceBetween={20}>
              <SwiperSlide>
                <div className="w-296d h-404d flex flex-col gap-y-24d">
                  <div className="font-abc font-bold text-11d uppercase">
                    cocolily country club
                  </div>
                  <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-296d h-404d flex flex-col gap-y-24d">
                  <div className="font-abc font-bold text-11d uppercase">
                    cocolily country club
                  </div>
                  <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-296d h-404d flex flex-col gap-y-24d">
                  <div className="font-abc font-bold text-11d uppercase">
                    cocolily country club
                  </div>
                  <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className="w-full mt-20d flex justify-between">
              <ArrowButton icon="arrow-left" variant="secondary" />
              <ArrowButton variant="secondary" />
            </div>
          </div>

          <div className="mt-90d">
            <div className="grid grid-cols-8">
              <div className="col-span-3 font-abc font-bold text-16d text-ruby-red uppercase">
                menu development
              </div>
              <div className="col-span-4 col-start-5 font-sans text-12d ">
                As we continue to grow, our menu will evolve with the seasons
                and eventually include savory options, appealing to a wider
                audience.
              </div>
            </div>

            <div className="mt-56d">
              <Swiper slidesPerView={3} spaceBetween={20}>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="w-full mt-20d flex justify-between">
              <ArrowButton icon="arrow-left" variant="secondary" />
              <ArrowButton variant="secondary" />
            </div>
          </div>

          <div className="mt-90d">
            <div className="grid grid-cols-8">
              <div className="col-span-3 font-abc font-bold text-16d text-ruby-red uppercase">
                menu development
              </div>
              <div className="col-span-4 col-start-5 font-sans text-12d ">
                As we continue to grow, our menu will evolve with the seasons
                and eventually include savory options, appealing to a wider
                audience.
              </div>
            </div>

            <div className="mt-56d">
              <Swiper slidesPerView={3} spaceBetween={20}>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-296d h-404d flex flex-col gap-y-24d">
                    <div className="font-abc font-bold text-11d uppercase">
                      cocolily country club
                    </div>
                    <div className="w-full h-full bg-ruby-red rounded-32d"></div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="w-full mt-20d flex justify-between">
              <ArrowButton icon="arrow-left" variant="secondary" />
              <ArrowButton variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhatDone;
