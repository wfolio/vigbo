"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { restore } from "~/app/passwords/restore/actions";
import { cn } from "~/utils/cn";

const schema = z
  .object({
    current: z.string().min(6, {
      message: "Укажите текущий пароль",
    }),
    newPassword: z.string().min(6, {
      message: "Укажите новый пароль",
    }),
    repeat: z.string().min(6, {
      message: "Повторите новый пароль",
    }),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword === value.current) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Новый пароль не должен совпадать с текущим",
        path: ["newPassword"],
      });
    }
    if (value.newPassword != value.repeat) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли не совпадают",
        path: ["repeat"],
      });
    }
  });

export default function RestorePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = handleSubmit(async ({ current, newPassword, repeat }) => {
    setIsLoading(true);
    await restore({
      email,
      current,
      newPassword,
      repeat,
    });
    setIsLoading(false);
    router.push("https://vigbo.com");
  });

  return (
    <form
      className="w-full gap-6 flex flex-col items-center justify-center"
      onSubmit={onSubmit}
    >
      <h1 className="text-[36px] lg:text-5xl font-medium sm:w-[440px] w-full text-center">
        Изменение пароля
      </h1>
      <div className="flex flex-col gap-3 items-center justify-center w-full sm:w-[440px]">
        <input
          placeholder="Текущий пароль"
          type="password"
          className={cn(
            "h-20 border-2 border-[#f0f0f0] bg-[#f0f0f0] py-[11px] px-4 w-full rounded-full outline-none text-center placeholder:text-black font-medium text-lg placeholder:focus:text-xs placeholder:focus:opacity-50 placeholder:transition-all placeholder:focus:-translate-y-[24px]",
            {
              "border-red-600 focus:border-red-600": !!errors.current,
            },
          )}
          {...register("current")}
        />
        {!!errors.current && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> {errors.current.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center justify-center w-full sm:w-[440px]">
        <input
          placeholder="Новый пароль"
          type="password"
          className={cn(
            "h-20 border-2 border-[#f0f0f0] bg-[#f0f0f0] py-[11px] px-4 w-full rounded-full outline-none text-center placeholder:text-black font-medium text-lg placeholder:focus:text-xs placeholder:focus:opacity-50 placeholder:transition-all placeholder:focus:-translate-y-[24px]",
            {
              "border-red-600 focus:border-red-600": !!errors.newPassword,
            },
          )}
          {...register("newPassword")}
        />
        {!!errors.newPassword && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> {errors.newPassword.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center justify-center w-full sm:w-[440px]">
        <input
          placeholder="Подтверждение пароля"
          type="password"
          className={cn(
            "h-20 border-2 border-[#f0f0f0] bg-[#f0f0f0] py-[11px] px-4 w-full rounded-full outline-none text-center placeholder:text-black font-medium text-lg placeholder:focus:text-xs placeholder:focus:opacity-50 placeholder:transition-all placeholder:focus:-translate-y-[24px]",
            {
              "border-red-600 focus:border-red-600": !!errors.repeat,
            },
          )}
          {...register("repeat")}
        />
        {!!errors.repeat && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> {errors.repeat.message}
          </p>
        )}
      </div>
      <button
        className="w-full sm:w-[440px] h-20 rounded-full flex items-center justify-center text-center px-10 py-3.5 bg-black text-white text-lg font-medium disabled:opacity-50"
        disabled={isLoading}
      >
        Изменить пароль
      </button>
      <Link
        href="/login"
        className="w-full flex items-center justify-center text-center rounded-md font-medium underline hover:no-underline"
      >
        Вход с паролем
      </Link>
    </form>
  );
}
