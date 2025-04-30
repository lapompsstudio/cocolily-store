import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      name,
      email,
      company,
      whatsapp_number,
      message,
    }: {
      name: string;
      email: string;
      company: string;
      whatsapp_number: string;
      message: string;
      recaptchaToken?: string;
    } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL as string,
        pass: process.env.APP_PASSWORD as string,
      },
    });

    // Email to the user confirming their contact form submission
    const userMailOptions = {
      from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.APP_EMAIL}>`,
      to: email,
      subject: "Thank You for Contacting Us",
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f1f2;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #DB0032; margin: 0; font-size: 24px; font-weight: bold;">Thank You for Contacting Us!</h1>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.5; margin-top: 0;">
                Dear <strong>${name}</strong>,
              </p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.5;">
                We've received your message from <strong>${company}</strong> and want to thank you for reaching out to us.
              </p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.5;">
                Our team will review your inquiry and get back to you as soon as possible. We typically respond within 1-2 business days.
              </p>
              
              <div style="background-color: #f9f1f2; border-left: 4px solid #DB0032; padding: 15px; margin: 25px 0; border-radius: 0 4px 4px 0;">
                <p style="color: #555; font-size: 15px; margin: 0; font-style: italic;">
                  "We value your feedback and look forward to assisting you."
                </p>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.5;">
                If you have any additional information to share or questions in the meantime, please feel free to reply to this email.
              </p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                Best regards,<br>
                The ${process.env.NEXT_PUBLIC_APP_NAME} Team
              </p>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #777; text-align: center;">
                <p>This is an automated response to your contact form submission. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
    };

    // Email to admin with contact form details
    const adminMailOptions = {
      from: `"${process.env.NEXT_PUBLIC_APP_NAME}" <${process.env.APP_EMAIL}>`,
      to: process.env.APP_EMAIL as string,
      subject: `New Contact Form Submission from ${company}`,
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; padding: 30px;">
              <h2 style="color: #DB0032; margin-top: 0;">New Contact Form Submission</h2>
              
              <div style="margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Full Name:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #DB0032;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">WhatsApp Number:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${whatsapp_number}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date & Time:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
                <h3 style="margin-top: 0; color: #333; font-size: 16px;">Message:</h3>
                <p style="white-space: pre-line; color: #444; margin-bottom: 0;">${message}</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" style="display: inline-block; padding: 10px 20px; background-color: #DB0032; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Reply to ${name}</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
              <p>This email was sent from your contact form on ${process.env.NEXT_PUBLIC_APP_NAME}</p>
            </div>
          </div>
        </body>
      </html>
      `,
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { message: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
