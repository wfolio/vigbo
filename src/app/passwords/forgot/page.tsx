import { Metadata } from "next";
import ForgotPassword from "~/components/forgot-password";

export const metadata: Metadata = {
  title: "Восстановление пароля",
};

export default function Home() {
  return <ForgotPassword />;
}
