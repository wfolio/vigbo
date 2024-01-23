import { Metadata } from "next";
import RestorePassword from "~/components/restore-password";

export const metadata: Metadata = {
  title: "Восстановление доступа",
};

export default function Home() {
  return <RestorePassword />;
}
