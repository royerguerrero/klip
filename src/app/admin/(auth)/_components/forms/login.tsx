"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schemas";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";
import { FormField } from "@/app/_components/ui/form";
import { FormItem } from "@/app/_components/ui/form";
import { FormControl } from "@/app/_components/ui/form";
import { FormMessage } from "@/app/_components/ui/form";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

import { login } from "@/app/admin/(auth)/_lib/actions";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const error = await login(data);
    switch (error?.name) {
      case "UserNotFoundError":
        form.setError("root", {
          message: "Correo electrónico o contraseña incorrectos",
        });
        break;
      case "UserInvalidCredentialsError":
        form.setError("root", {
          message: "Correo electrónico o contraseña incorrectos",
        });
        break;
      default:
        form.setError("root", { message: "Ocurrió un error" });
        break;
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Correo electrónico" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Contraseña"
                    type={passwordVisible ? "text" : "password"}
                  />
                  {passwordVisible ? (
                    <Icon
                      icon="ph:eye"
                      height={20}
                      className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  ) : (
                    <Icon
                      icon="ph:eye-closed"
                      height={20}
                      className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" className="w-full" type="submit">
          Ingresar
        </Button>
      </form>
    </Form>
  );
}
