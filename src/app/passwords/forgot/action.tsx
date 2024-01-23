"use server";

import { render } from "@react-email/components";
import VigboForgotEmail from "~/emails/forgot";
import { transporter } from "~/utils/transporter";

export async function reset({ email }: { email: string }) {
  try {
    await transporter.sendMail({
      from: {
        name: "Поддержка Vigbo",
        address: process.env.NODEMAILER_USER!,
      },
      to: email,
      subject: "Восстановление пароля на Vigbo",
      html: render(<VigboForgotEmail email={email} />),
    });
    return { status: 201 };
  } catch (e) {
    return { status: 500 };
  }
}
