import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  icons: "https://vigbo.com/favicon/vigbo.png",
  title:
    "Vigbo — первый сервис для фотографов: сайт-портфолио, галереи для передачи фото, интернет-магазин",
};

export default function NotFound() {
  redirect("/login");
}
