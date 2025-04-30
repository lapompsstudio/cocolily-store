import Button from "@/components/ui/button";
import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

// Define our form data interface
interface FormData {
  name: string;
  email: string;
  whatsapp_number: string;
  topic: string;
  message: string;
}

// Define possible topics type for type safety
type TopicOption =
  | "Just saying hi"
  | "General question"
  | "Feedback"
  | "Media / Press";

const FormGeneral = ({ activeMode }: { activeMode: string }): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormSuccess, setIsFormSuccess] = useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>();

  // Watch the topic value from react-hook-form
  const selectedTopic = watch("topic");

  // Reset success message when form becomes dirty or when validation errors occur
  useEffect(() => {
    if (Object.keys(errors).length > 0 || isDirty) {
      setIsFormSuccess(false);
    }
  }, [errors, isDirty]);

  useEffect(() => {
    if (activeMode !== "general") {
      reset();
    }
  }, [activeMode, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setRecaptchaError(null);

    const { name, email, whatsapp_number, topic, message } = data;

    if (!executeRecaptcha) {
      console.error("Recaptcha has not been initialized");
      setRecaptchaError(
        "reCAPTCHA verification failed. Please try again later."
      );
      setIsSubmitting(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("submit");

    const response = await fetch("/api/contact-general", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        whatsapp_number,
        topic,
        message,
        recaptchaToken,
      }),
    });

    if (response.ok) {
      reset();
      setIsSubmitting(false);
      setIsFormSuccess(true);
    } else {
      setIsSubmitting(false);
      setIsFormSuccess(false);

      // Handle the error response from the API
      try {
        const errorData = await response.json();
        if (errorData.message === "reCAPTCHA verification failed") {
          setRecaptchaError("reCAPTCHA verification failed. Please try again.");
        } else {
          setRecaptchaError("Something went wrong. Please try again later.");
        }
      } catch (error) {
        setRecaptchaError("Something went wrong. Please try again later.");
      }
    }
  };

  // Ref for the dropdown container to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Topics for the dropdown
  const topics: TopicOption[] = [
    "Just saying hi",
    "General question",
    "Feedback",
    "Media / Press",
  ];

  // Toggle dropdown visibility
  const handleSelect = (): void => {
    if (isSubmitting) return;
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle selecting a topic from dropdown
  const handleTopicSelect = (topic: TopicOption): void => {
    // Set the value in react-hook-form
    setValue("topic", topic, { shouldValidate: true, shouldDirty: true });
    setIsDropdownOpen(false);
    // Clear success message when user changes form values
    setIsFormSuccess(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setIsFormSuccess(false)} // Reset success on any form change
        className={clsx("space-y-20d relative", {
          "opacity-30": isSubmitting,
        })}
      >
        <div className="grid md:landscape:grid-cols-8 gap-x-20d gap-48d">
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="name"
              className="reveal-form-animate clipped reveal-general text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              FULL NAME {errors.name && <span>*</span>}
            </label>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              placeholder="Hi! I'm..."
              className="reveal-form-animate clipped reveal-general border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="email"
              className="reveal-form-animate clipped reveal-general text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              EMAIL {errors.email && <span>*</span>}
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
              className="reveal-form-animate clipped reveal-general border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="whatsapp_number"
              className="reveal-form-animate clipped reveal-general text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              WHATSAPP NUMBER {errors.whatsapp_number && <span>*</span>}
            </label>
            <input
              type="text"
              {...register("whatsapp_number", {
                required: "Whatsapp number is required",
              })}
              placeholder="+971 5X XXX XXXX"
              className="reveal-form-animate clipped reveal-general border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="topic"
              className="reveal-form-animate clipped reveal-general text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              WHAT&apos;S THIS ABOUT? {errors.topic && <span>*</span>}
            </label>
            <div className="relative" ref={dropdownRef}>
              {/* Hidden input to store the value in react-hook-form */}
              <input
                type="hidden"
                {...register("topic", { required: "Topic is required" })}
              />

              <input
                type="text"
                placeholder="Choose a topic..."
                className="reveal-form-animate clipped reveal-general border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full cursor-pointer"
                onClick={handleSelect}
                readOnly
                value={selectedTopic || ""}
                role="combobox"
                aria-expanded={isDropdownOpen}
                aria-controls="topic-listbox"
                aria-haspopup="listbox"
                disabled={isSubmitting}
              />
              <div
                aria-hidden="true"
                className="reveal-form-animate clipped reveal-general absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
                onClick={handleSelect}
              >
                <svg
                  width="15"
                  height="6"
                  viewBox="0 0 15 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    "transition-transform ease-in-out duration-300",
                    {
                      "rotate-180": isDropdownOpen,
                    }
                  )}
                >
                  <path d="M1 1L7.5 5L14 1" stroke="#DB0032" />
                </svg>
              </div>

              {isDropdownOpen && (
                <div
                  className="w-full absolute top-full left-0 text-20d text-ruby-red bg-ivory-blush space-y-8d border-b border-ruby-red z-50 py-8d"
                  role="listbox"
                  id="topic-listbox"
                  aria-labelledby="topic"
                >
                  {topics.map((topic, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer transition-opacity ease-in-out duration-300 py-2 ${
                        selectedTopic === topic
                          ? "opacity-100"
                          : "opacity-30 hover:opacity-100"
                      }`}
                      onClick={() => handleTopicSelect(topic)}
                      role="option"
                      aria-selected={selectedTopic === topic}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="md:landscape:col-span-8 flex flex-col gap-24d relative">
            <label
              htmlFor="message"
              className="reveal-form-animate clipped reveal-general text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              WHAT&apos;S ON YOUR MIND? {errors.message && <span>*</span>}
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={6}
              placeholder="Here's something sweet to share..."
              className="reveal-form-animate clipped reveal-general border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex justify-between relative">
          {(errors.name ||
            errors.email ||
            errors.whatsapp_number ||
            errors.topic ||
            errors.message) && (
            <p className="text-ruby-red text-10d absolute left-0 top-0">
              * INDICATES REQUIRED FIELD
            </p>
          )}
          {isFormSuccess && !isDirty && !Object.keys(errors).length && (
            <p className="text-green-500 text-10d absolute left-0 top-0">
              Message sent successfully!
            </p>
          )}
          {recaptchaError && (
            <p className="text-ruby-red text-10d absolute left-0 top-0">
              {recaptchaError}
            </p>
          )}
          <Button
            type="submit"
            className="reveal-form-animate clipped reveal-general ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </Button>
        </div>
      </form>

      {isSubmitting && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-48d h-48d border-4 border-t-transparent border-ruby-red rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default FormGeneral;
