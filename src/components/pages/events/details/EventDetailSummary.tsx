import React from "react";
import Tag from "@/components/ui/Tag";
import Image from "next/image";
import "./event-detail.css";

const data = {
  id: "f331a02e-bf9e-4bc7-845c-f44f6268c78d",
  date: "FEB 12 - FEB 20 2025",
  time: "5 PM - 11 PM",
  location: "ETIHAD MUSEUM, DUBAI",
};

const EventDetailSummary = () => {
  return (
    <div className="pt-115d px-20d">
      <div className="grid md:grid-cols-12 gap-20d">
        <div className="md:col-span-4 w-3/4 flex flex-col">
          <span className="text-16d text-ruby-red font-abc font-bold leading-none uppercase">
            Coming Soon
          </span>
          <p className="text-32d text-ruby-red font-abc font-bold leading-none uppercase mt-20d">
            Get Ready for a Sweet Experience
          </p>
          <p className="text-10d text-ruby-red mt-auto">
            EXPLORE THE CHOCOLATE INFUSED EXPERIENCES
          </p>
        </div>
        <div className="md:col-span-8">
          <h2 className="text-128d text-ruby-red font-abc font-bold uppercase leading-0.85">
            COCOLILY COUNTRY CLUB
          </h2>
          <div className="mt-75d flex gap-20d">
            <Tag
              variant="secondary"
              className="text-10d text-ruby-red h-27d !font-normal !px-12d"
            >
              COCOA BAR
            </Tag>
            <Tag
              variant="secondary"
              className="text-10d text-ruby-red h-27d !font-normal !px-12d"
            >
              MERCH BAR
            </Tag>
            <Tag
              variant="secondary"
              className="text-10d text-ruby-red h-27d !font-normal !px-12d"
            >
              SELF STUDIO
            </Tag>
          </div>
        </div>
      </div>

      <div className="grid md:landscape:grid-cols-12 gap-20d mt-78d">
        <div className="md:landscape:col-span-3">
          <div className="summary-card border border-ruby-red rounded-32d p-20d bg-transparent h-168d overflow-hidden">
            <div className="flex justify-between">
              <p className="text-12d text-ruby-red">DATES</p>
              <figure className="w-40d h-40d relative">
                <Image
                  src={"/icons/dates.svg"}
                  className="object-contain w-full h-full"
                  fill
                  alt="icon"
                />
              </figure>
            </div>
            <h3 className="font-abc font-bold text-16d uppercase leading-none text-ruby-red max-w-115d pt-20d">
              {data.date}
            </h3>
          </div>
        </div>
        <div className="md:landscape:col-span-3">
          <div className="summary-card border border-ruby-red rounded-32d p-20d bg-transparent h-168d overflow-hidden">
            <div className="flex justify-between">
              <p className="text-12d text-ruby-red">HOURS</p>
              <figure className="w-40d h-40d relative">
                <Image
                  src={"/icons/times.svg"}
                  className="object-contain w-full h-full"
                  fill
                  alt="icon"
                />
              </figure>
            </div>
            <h3 className="font-abc font-bold text-16d uppercase leading-none text-ruby-red max-w-107d pt-20d">
              {data.time}
            </h3>
          </div>
        </div>
        <div className="md:landscape:col-span-3">
          <div className="summary-card border border-ruby-red rounded-32d p-20d bg-transparent h-168d overflow-hidden">
            <div className="flex justify-between">
              <p className="text-12d text-ruby-red">LOCATION</p>
              <figure className="w-40d h-40d relative">
                <Image
                  src={"/icons/location.svg"}
                  className="object-contain w-full h-full"
                  fill
                  alt="icon"
                />
              </figure>
            </div>
            <h3 className="font-abc font-bold text-16d uppercase leading-none text-ruby-red max-w-155d pt-20d">
              {data.location}
            </h3>
          </div>
        </div>

        <div className="md:landscape:col-span-3 relative">
          <div className="group summary-other-event-container h-168d relative overflow-visible cursor-pointer">
            <div className="summary-other-event absolute bottom-0 left-0 right-0 border border-white rounded-32d p-20d bg-ruby-red h-168d overflow-hidden">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-full h-270d">
                <Image
                  className="object-cover w-full h-full"
                  src="/events/other-event.png"
                  alt="image"
                  fill
                />
              </div>
              <div className="flex justify-between z-10">
                <h3 className="font-abc font-bold text-16d uppercase leading-none text-white max-w-132d relative">
                  SEE THE OTHER EVENT
                </h3>
                <figure className="w-22d h-20d relative">
                  <Image
                    src={"/icons/arrow-next.svg"}
                    className="object-contain w-full h-full"
                    fill
                    alt="icon"
                  />
                </figure>
              </div>
              <h4 className="text-10d leading-1.1 text-white absolute bottom-20d right-20d">
                PDL X COCOLILY
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailSummary;
