"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reset } from "~/app/passwords/forgot/action";
import { cn } from "~/utils/cn";

const schema = z.object({
  email: z.string().email({
    message: "Укажите адрес электронной почты",
  }),
});

export default function ForgotPassword() {
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<number | null>(null);

  const onSubmit = handleSubmit(async ({ email }) => {
    setIsLoading(true);
    const { status } = await reset({ email });
    setResponse(status);
    setIsLoading(false);
  });

  return (
    <form
      className="w-full gap-6 flex flex-col items-center justify-center"
      onSubmit={onSubmit}
    >
      <h1 className="text-[36px] lg:text-5xl font-medium sm:w-[440px] w-full text-center">
        Восстановление пароля
      </h1>
      {!!response && response < 500 && (
        <div className="bg-[#eae5df] py-[20px] px-[30px] rounded-md text-[12px] flex flex-col gap-4">
          <p>Проверьте вашу почту.</p>
          <p>
            Eсли адрес{" "}
            <span className="font-semibold">{getValues("email")}</span>{" "}
            зарегистрирован в системе, вы должны получить письмо с инструкциями
            по восстановлению нового пароля.
          </p>
          <p>
            <span className="font-semibold">Не получили письмо?</span> Проверьте
            папку «Спам».
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3 items-center justify-center w-full sm:w-[440px]">
        <input
          autoComplete="off"
          autoCorrect="off"
          placeholder="Ваш email"
          className={cn(
            "h-20 border-2 border-[#f0f0f0] bg-[#f0f0f0] py-[11px] px-4 w-full rounded-full outline-none text-center placeholder:text-black font-medium text-lg placeholder:focus:text-xs placeholder:focus:opacity-50 placeholder:transition-all placeholder:focus:-translate-y-[24px]",
            {
              "border-red-600 focus:border-red-600": !!errors.email,
            },
          )}
          {...register("email")}
        />
        {!!errors.email && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> {errors.email.message}
          </p>
        )}
      </div>
      {!!response && response === 500 && (
        <p
          className={cn(
            "text-sm text-red-600 inline-flex gap-1 items-center",
            {},
          )}
        >
          <AlertCircle className="w-4 h-4" />
          Ошибка при отправке сообщения
        </p>
      )}
      <button
        className="w-full sm:w-[440px] h-20 rounded-full flex items-center justify-center text-center px-10 py-3.5 bg-black text-white text-lg font-medium disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Отправка..." : "Далее"}
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
