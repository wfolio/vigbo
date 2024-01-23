import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  icons: "https://wfolio.ru/favicon.ico",
  title:
    "wfolio - сайты для фотографов. Создайте красивый сайт за несколько минут.",
};

export default function NotFound() {
  redirect("/login");
}
