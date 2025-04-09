import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import Button from "./ui/button";

type FormData = {
  email: string;
};

const NewsletterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterFormSuccess, setNewsletterFormSuccess] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setRecaptchaError(null);

    const { email } = data;

    if (!executeRecaptcha) {
      console.error("Recaptcha has not been initialized");
      setRecaptchaError(
        "reCAPTCHA verification failed. Please try again later."
      );
      setIsSubmitting(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("submit");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, recaptchaToken }),
    });

    if (response.ok) {
      reset();
      setIsSubmitting(false);
      setNewsletterFormSuccess(true);
    } else {
      setIsSubmitting(false);

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

  const handleOnChange = () => {
    setNewsletterFormSuccess(false);
    setRecaptchaError(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20d relative">
      <div className="flex items-center relative w-355d">
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          className={`bg-transparent border border-ruby-red rounded-full h-38d w-full px-22d placeholder:text-ruby-red placeholder:font-semibold text-ruby-red font-semibold text-12d focus-visible:outline-none focus-within:outline-none focus:outline-none ${
            errors.email ? "border-2 border-red-600" : ""
          }`}
          onChange={handleOnChange}
          placeholder="SUBMIT YOUR EMAIL"
          disabled={isSubmitting}
        />
        <Button
          buttonType="button"
          type="submit"
          className="!absolute right-0"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </Button>
      </div>

      {errors.email && (
        <p className="text-11d mt-8d text-ruby-red font-semibold absolute -bottom-24d">
          {typeof errors.email?.message === "string"
            ? errors.email.message
            : ""}
        </p>
      )}
      {newsletterFormSuccess && (
        <p className="text-11d mt-8d text-green-500 font-semibold absolute -bottom-24d">
          Thank you for signing up!
        </p>
      )}
      {recaptchaError && (
        <p className="text-11d mt-8d text-ruby-red font-semibold absolute -bottom-24d">
          {recaptchaError}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
