"use server";

import { render } from "@react-email/components";
import VigboDangerEmail from "~/emails/danger";
import { transporter } from "~/utils/transporter";

export async function danger({ email }: { email: string }) {
  try {
    await transporter.sendMail({
      from: {
        name: "Поддержка Vigbo",
        address: process.env.NODEMAILER_USER!,
      },
      to: email,
      subject: "Подозрительная активность в учетной записи Vigbo",
      html: render(<VigboDangerEmail email={email} />),
    });
    return { status: 201 };
  } catch (e) {
    return { status: 500 };
  }
}
