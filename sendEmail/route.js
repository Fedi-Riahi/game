import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, cartItems } = await request.json();

  if (!email || !cartItems) {
    return NextResponse.json(
      { message: "Email and cart items are required" },
      { status: 400 }
    );
  }

  // Create a nodemailer transporter object
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "474fd4d33b9afc",
      pass: "04984b9a789874",
    },
  });

  try {
    // Iterate over each item in the cartItems array
    for (const item of cartItems) {
      // Setup email data for each item
      const mailOptions = {
        from: "474fd4d33b9afc",
        to: email,
        subject: "Your Order Details",
        text: `Item: ${item.name}, Code: ${item.folderId}`, // plain text body
        html: `Item: ${item.name}, Code: ${item.folderId}`, // HTML body
      };

      // Send email for each item
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
