import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  company: string;
  whatsapp_number: string;
  message: string;
  recaptchaToken: string;
}

interface RecaptchaResponse {
  success: boolean;
  score: number;
}

interface StrapiResponse {
  data: any;
  meta?: any;
  error?: {
    status: number;
    message: string;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse | Response> {
  try {
    // reserve the console logs for debugging
    console.log("Step 1: Parsing request body");
    const { name, email, company, whatsapp_number, message, recaptchaToken } =
      (await req.json()) as RequestBody;

    // reserve the console logs for debugging
    console.log("Step 2: Verifying reCAPTCHA");
    const verifyRes = await axios.post<RecaptchaResponse>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );

    const { success, score } = verifyRes.data;
    // reserve the console logs for debugging
    console.log("Step 2.1: reCAPTCHA response", { success, score });

    if (!success || score < 0.5) {
      // reserve the console logs for debugging
      console.log("Step 2.2: reCAPTCHA verification failed");
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // reserve the console logs for debugging
    console.log("Step 3: Sending data to Strapi");
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-form-collaborates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: { name, email, company, whatsapp_number, message },
        }),
      }
    );

    const strapiData = (await strapiResponse.json()) as StrapiResponse;
    // reserve the console logs for debugging
    console.log("Step 3.1: Strapi response", strapiData);

    if (!strapiResponse.ok) {
      // reserve the console logs for debugging
      console.log("Step 3.2: Strapi request failed");
      return new Response(JSON.stringify({ error: strapiData }), {
        status: strapiResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // reserve the console logs for debugging
    console.log("Step 4: Sending email");
    const emailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email-contact-collaborate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          whatsapp_number,
          message,
        }),
      }
    );

    // reserve the console logs for debugging
    console.log("Step 4.1: Email response status", emailResponse.status);

    if (!emailResponse.ok) {
      // reserve the console logs for debugging
      console.log("Step 4.2: Failed to send email");
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: emailResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // reserve the console logs for debugging
    console.log("Step 5: Successfully completed all steps");
    return new Response(JSON.stringify(strapiData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // reserve the console logs for debugging
    console.log("Step 6: Error occurred", errorMessage);

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
