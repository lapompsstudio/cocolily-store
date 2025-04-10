import React from "react";
import Image from "next/image";

const AboutPurpose = () => {
  return (
    <div className="min-h-screen bg-baby-pink pt-142d pb-150d text-ruby-red">
      <div className="text-center space-y-80d">
        <p className="text-16d font-bold font-abc uppercase">IN 2022</p>
        <h2 className="text-32d font-bold font-abc uppercase max-w-1200d mx-auto">
          Cocolily hit Instagram with a bang when our first beverage—the Iced
          Coco—went viral. This taught us about how an experience over a product
          can build a long-lasting relationship with a brand. So we ran with it.
        </h2>
      </div>
      <div className="mt-150d mb-180d grid md:landscape:grid-cols-12">
        <div className="col-span-4 pr-24d text-right relative">
          <div className="absolute top-92d right-64d max-w-335d">
            <h3 className="text-16d font-bold font-abc uppercase">
              Building experiences
              <span className="absolute -right-40d -top-5d">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6091 11.3925C10.1226 11.4473 9.66923 11.6656 9.32309 12.0117C8.97696 12.3579 8.75864 12.8113 8.70388 13.2977C8.60219 13.3155 8.49913 13.3244 8.39588 13.3241C5.84388 13.3549 3.77148 11.0009 3.77148 11.0009C3.77148 11.0009 5.84388 8.64692 8.39588 8.68213C8.49892 8.68272 8.60181 8.69007 8.70388 8.70413C8.75864 9.19056 8.97696 9.64398 9.32309 9.99012C9.66923 10.3362 10.1226 10.5546 10.6091 10.6093C10.648 10.8689 10.648 11.1329 10.6091 11.3925Z"
                    fill="#C92539"
                  />
                  <path
                    d="M13.3236 8.39979C13.3236 8.50099 13.3236 8.59779 13.3236 8.69899C12.8335 8.74983 12.3754 8.96633 12.025 9.31273C11.6746 9.65914 11.4529 10.1147 11.3964 10.6042C11.1357 10.6482 10.8695 10.6482 10.6088 10.6042C10.5525 10.1183 10.3337 9.66577 9.98789 9.31993C9.64204 8.97408 9.18947 8.75527 8.70362 8.69899C8.68755 8.60009 8.68018 8.49998 8.68162 8.39979C8.64202 5.83899 11.0004 3.77539 11.0004 3.77539C11.0004 3.77539 13.3588 5.83899 13.3236 8.39979Z"
                    fill="#C92539"
                  />
                  <path
                    d="M18.2299 11.0009C18.2299 11.0009 16.1619 13.3593 13.6055 13.3285C13.5052 13.3287 13.4051 13.3198 13.3063 13.3021C13.2491 12.8159 13.0294 12.3633 12.6828 12.0175C12.3362 11.6717 11.8831 11.453 11.3967 11.3969C11.3528 11.1362 11.3528 10.87 11.3967 10.6093C11.8831 10.5532 12.3362 10.3346 12.6828 9.98879C13.0294 9.64301 13.2491 9.19035 13.3063 8.70413C13.4055 8.69008 13.5054 8.68273 13.6055 8.68213C16.1619 8.64253 18.2299 11.0009 18.2299 11.0009Z"
                    fill="#C92539"
                  />
                  <path
                    d="M13.3241 13.6012C13.3593 16.1576 11.0009 18.2256 11.0009 18.2256C11.0009 18.2256 8.63811 16.1576 8.67771 13.6012C8.67613 13.4995 8.68349 13.3979 8.69972 13.2976C9.18586 13.242 9.63885 13.0235 9.98484 12.6775C10.3308 12.3315 10.5494 11.8785 10.6049 11.3924C10.8656 11.3484 11.1318 11.3484 11.3925 11.3924C11.4482 11.8792 11.6674 12.3327 12.0143 12.6787C12.3612 13.0248 12.8152 13.243 13.3021 13.2976C13.3153 13.3988 13.3241 13.4956 13.3241 13.6012Z"
                    fill="#C92539"
                  />
                </svg>
              </span>
            </h3>
            <p className="text-12d leading-1.4 mt-28d">
              Building on the success of the Iced Coco, we kept innovating,
              bringing new and exciting chocolate-based experiences that turn
              everyday moments into celebrations.
            </p>
          </div>
        </div>
        <div className="col-span-4">
          <Image
            width={384}
            height={456}
            className="mx-auto"
            src={"/about-us/drink.png"}
            alt="cocolily viral drink"
          />
        </div>
        <div className="col-span-4 pl-24d relative">
          <div className="absolute bottom-92d left-64d max-w-335d">
            <h3 className="text-16d font-bold font-abc uppercase relative">
              Beyond flavor
            </h3>
            <p className="text-12d leading-1.4 mt-28d">
              More than just flavors, these experiences were crafted to create
              lasting memories that customers could enjoy together.
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-32d font-bold font-abc uppercase max-w-1100d mx-auto text-center">
        We take an artisanal approach to each and every step of the experience,
        and this has remained unchanged—from our humble bonbon beginnings to
        where we are today.
      </h2>
    </div>
  );
};

export default AboutPurpose;
