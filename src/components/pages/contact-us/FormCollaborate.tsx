import Button from "@/components/ui/button";
import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";

// Define our form data interface
interface FormData {
  name: string;
  email: string;
  company: string;
  whatsapp_number: string;
  message: string;
}

const FormCollaborate = ({
  activeMode,
}: {
  activeMode: string;
}): JSX.Element => {
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormSuccess, setIsFormSuccess] = useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>();

  // Reset success message when form becomes dirty or when validation errors occur
  useEffect(() => {
    if (Object.keys(errors).length > 0 || isDirty) {
      setIsFormSuccess(false);
    }
  }, [errors, isDirty]);

  useEffect(() => {
    if (activeMode !== "collaborate") {
      reset();
    }
  }, [activeMode, reset]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setRecaptchaError(null);

    const { name, email, company, whatsapp_number, message } = data;

    if (!executeRecaptcha) {
      console.error("Recaptcha has not been initialized");
      setRecaptchaError(
        "reCAPTCHA verification failed. Please try again later."
      );
      setIsSubmitting(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("submit");

    const response = await fetch("/api/contact-collaborate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        whatsapp_number,
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
              className="reveal-collaborate text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              FULL NAME {errors.name && <span>*</span>}
            </label>
            <input
              type="text"
              {...register("name", { required: "Full name is required" })}
              placeholder="Who's reaching out?"
              className="reveal-collaborate border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="email"
              className="reveal-collaborate text-ruby-red text-16d font-bold font-abc cursor-pointer"
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
              placeholder="youremail@example.com"
              className="reveal-collaborate border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="company"
              className="reveal-collaborate text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              BRAND / COMPANY {errors.company && <span>*</span>}
            </label>
            <input
              type="text"
              {...register("company", { required: "Full name is required" })}
              placeholder="Are you reaching out as a brand? tell us"
              className="reveal-collaborate border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:landscape:col-span-4 flex flex-col gap-24d relative">
            <label
              htmlFor="whatsapp_number"
              className="reveal-collaborate text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              WHATSAPP NUMBER {errors.whatsapp_number && <span>*</span>}
            </label>
            <input
              type="text"
              {...register("whatsapp_number", {
                required: "Whatsapp number is required",
              })}
              placeholder="+971 5X XXX XXXX"
              className="reveal-collaborate border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>

          <div className="md:landscape:col-span-8 flex flex-col gap-24d relative">
            <label
              htmlFor="message"
              className="reveal-collaborate text-ruby-red text-16d font-bold font-abc cursor-pointer"
            >
              WHAT WOULD YOU LIKE TO COLLABORATE ON?{" "}
              {errors.message && <span>*</span>}
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={6}
              placeholder="No idea is too small or too big — tell us everything."
              className="reveal-collaborate border-b border-ruby-red bg-ivory-blush pb-8d text-ruby-red text-20d placeholder:text-ruby-red placeholder:opacity-30 w-full"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex justify-between relative">
          {(errors.name ||
            errors.email ||
            errors.company ||
            errors.whatsapp_number ||
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
            className="reveal-collaborate ml-auto"
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

export default FormCollaborate;
