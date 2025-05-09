import clsx from "clsx";

const ArrowButton = ({
  icon,
  variant = "primary",
}: {
  icon?: string | undefined | "arrow-left";
  variant?: "primary" | "secondary";
}) => {
  return (
    <div className="group cursor-pointer ">
      <div
        className={clsx(
          "md:landscape:w-62d md:landscape:h-62d rounded-full flex justify-center items-center relative border-[2px] border-ruby-red overflow-hidden",
          "w-52d h-52d",
          {
            "group-hover:translate-x-[20%] transition-all duration-300":
              icon !== "arrow-left",
            "group-hover:-translate-x-[20%] transition-all duration-300":
              icon === "arrow-left",
          },
          {
            "bg-transparent": variant === "primary",
            "bg-ivory": variant === "secondary",
          }
        )}
      >
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx("relative z-10", {
            "rotate-180": icon === "arrow-left",
          })}
        >
          <path
            d="M11.667 0C11.667 3.33333 13.667 10 21.667 10L11.667 0Z"
            fill="#DB0032"
            className="group-hover:fill-seashell transition-all duration-300"
          />
          <path
            d="M0 9.99902L20 9.99902H20.8333"
            stroke="#DB0032"
            strokeWidth="1.66667"
            className="group-hover:stroke-seashell transition-all duration-300"
          />
          <path
            d="M11.667 20C11.667 16.6667 13.667 10 21.667 10L11.667 20Z"
            fill="#DB0032"
            className="group-hover:fill-seashell transition-all duration-300"
          />
        </svg>

        <div
          className={clsx(
            "w-full h-full rounded-full  absolute top-0 left-0 bg-ruby-red group-hover:translate-x-0 transition-all duration-300",
            {
              "-translate-x-full": icon !== "arrow-left",
              "translate-x-full": icon === "arrow-left",
            }
          )}
        ></div>
      </div>
    </div>
  );
};

export default ArrowButton;
