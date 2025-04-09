import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email }: { email: string } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL as string,
        pass: process.env.APP_PASSWORD as string,
      },
    });

    const userMailOptions = {
      from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.APP_EMAIL}>`,
      to: email,
      subject: "Thank You for Subscribing to Our Newsletter!",
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 5px; padding: 20px;">
            <h2 style="color: #333;">Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!</h2>
            <p style="color: #555;">
              Thank you for subscribing to our newsletter! You will now receive exclusive updates, special offers, and the latest news directly to your inbox.
            </p>
            <p style="color: #555;">
              Stay tuned for exciting updates!
            </p>
            <p style="color: #555;">
              Best Regards,<br>
              The ${process.env.NEXT_PUBLIC_APP_NAME} Team
            </p>
          </div>
        </body>
      </html>
      `,
    };

    const adminMailOptions = {
      from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.APP_EMAIL}>`,
      to: process.env.APP_EMAIL as string,
      subject: "New Newsletter Update Submission",
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 5px; padding: 20px;">
            <h2 style="color: #333;">New Newsletter Update Submission</h2>
            <p style="color: #555;">
              We have a new user who has subscribed to our newsletter. Here are the details:
            </p>
            <p style="color: #555;">
              Email: <strong>${email}</strong>
            </p>
            <p style="color: #555;">
              Subscription Type: [Newsletter Update]
            </p>
            <p style="color: #555;">
              Date & Time: ${new Date(Date.now()).toLocaleString()}
            </p>
            <p style="color: #555;">
              Thank you!
            </p>
          </div>
        </body>
      </html>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { message: "Email sending failed" },
      { status: 500 }
    );
  }
}
