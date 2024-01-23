import { Metadata } from "next";
import DangerPassword from "~/components/danger-password";

export const metadata: Metadata = {
  title: "Восстановление пароля [danger]",
};

export default function Home() {
  return <DangerPassword />;
}
