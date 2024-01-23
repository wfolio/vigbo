"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { danger } from "~/app/passwords/danger/actions";
import { cn } from "~/utils/cn";

const schema = z.object({
  email: z.string().email({
    message: "Укажите правильный адрес электронной почты",
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
    const { status } = await danger({ email });
    setResponse(status);
    setIsLoading(false);
  });

  return (
    <form
      className="w-full lg:w-[480px] gap-6 flex flex-col"
      onSubmit={onSubmit}
    >
      <h1 className="text-4xl lg:text-[44px] font-semibold leading-[1.25]">
        Восстановление пароля [danger]
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
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold">
          E-mail, указанный при регистрации
        </span>
        <input
          autoComplete="off"
          autoCorrect="off"
          placeholder="Ваш email"
          className={cn(
            "border py-[11px] px-4 lg:w-[480px] rounded-md outline-none focus:border-black placeholder:text-sm",
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
      <div className="flex flex-col lg:flex-row w-full justify-between">
        <button
          className="lg:w-1/2 flex items-center justify-center text-center px-10 py-3.5 rounded-md bg-black text-white text-sm font-semibold h-14 hover:opacity-80 transition-all "
          disabled={isLoading}
        >
          {isLoading ? "Отправка..." : "Далее"}
        </button>
        <Link
          href="/login"
          className="lg:w-1/2 flex items-center justify-center lg:mr-10 text-center rounded-md font-semibold h-14 underline hover:no-underline"
        >
          Вход с паролем
        </Link>
      </div>
    </form>
  );
}
