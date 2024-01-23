import { Metadata } from "next";
import ResetPassword from "~/components/reset-password";

export const metadata: Metadata = {
  title: "Изменение пароля",
};

export default function Home() {
  return <ResetPassword />;
}
