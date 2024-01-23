"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "~/app/login/actions";
import { cn } from "~/utils/cn";

const schema = z.object({
  email: z.string().email({
    message: "Укажите адрес электронной почты",
  }),
  password: z.string().min(6, {
    message: "Укажите пароль для входа",
  }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resolved, setResolved] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await login(data);
    setResolved(true);
    setIsLoading(false);
  });

  useEffect(() => {
    if (resolved) {
      reset({
        password: "",
      });
      setDirty(true);
    }
  }, [reset, resolved]);

  return (
    <form
      className="w-full gap-6 flex flex-col items-center justify-center"
      onSubmit={onSubmit}
    >
      <h1 className="text-[36px] lg:text-5xl font-medium">Войти</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-1">
        <span>Нет аккаунта?</span>
        <Link
          href="https://vigbo.com"
          target="_blank"
          className="w-fit flex items-center justify-center text-center rounded-md underline hover:no-underline"
        >
          Зарегистрируйтесь
        </Link>
      </div>
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
      <div className="flex flex-col gap-3 items-center justify-center w-full sm:w-[440px]">
        <input
          autoComplete="off"
          autoCorrect="off"
          placeholder="Ваш пароль"
          type="password"
          className={cn(
            "w-full h-20 border-2 border-[#f0f0f0] bg-[#f0f0f0] py-[11px] px-4 rounded-full outline-none text-center placeholder:text-black font-medium text-lg placeholder:focus:text-xs placeholder:focus:opacity-50 placeholder:transition-all placeholder:focus:-translate-y-[24px]",
            {
              "border-red-600 focus:border-red-600": !!errors.password,
            },
          )}
          {...register("password")}
        />
        {!!dirty && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> Неправильный пароль, попробуйте
            еще раз
          </p>
        )}
        {!!errors.password && (
          <p className="text-red-600 text-sm inline-flex gap-1 items-center">
            <AlertCircle className="w-4 h-4" /> {errors.password.message}
          </p>
        )}
      </div>
      <button
        className="w-full sm:w-[440px] h-20 rounded-full flex items-center justify-center text-center px-10 py-3.5 bg-black text-white text-lg font-medium disabled:opacity-50"
        disabled={isLoading}
      >
        Войти
      </button>
      <Link
        href="/passwords/forgot"
        className="w-full flex items-center justify-center text-center rounded-md font-medium underline hover:no-underline"
      >
        Не можете войти?
      </Link>
    </form>
  );
}
