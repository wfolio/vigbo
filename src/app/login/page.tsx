import { Metadata } from "next";
import Login from "~/components/login";

export const metadata: Metadata = {
  title: "Вход в личный кабинет",
};

export default function Home() {
  return <Login />;
}
