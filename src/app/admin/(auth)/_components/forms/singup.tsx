"use client";

import { signup } from "@/app/admin/(auth)/_lib/actions";
import { signupSchema } from "@/app/admin/(auth)/_components/forms/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { z } from "zod";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function SignupForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const error = await signup(data);
    switch (error?.name) {
      case "UserAlreadyExistsError":
        form.setError("root", {
          message: "El correo electrónico ya está en uso",
        });
        break;
      case "UserInvalidCredentialsError":
        form.setError("root", { message: "La contraseña no es válida" });
        break;
      default:
        form.setError("root", { message: "Ocurrió un error" });
        break;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Nombre" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Apellido" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
        <Button type="submit" className="w-full" variant="secondary">
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
