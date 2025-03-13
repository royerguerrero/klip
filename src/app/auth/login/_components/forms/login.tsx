"use client";

import { Form } from "@heroui/form";
import { Alert, Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "@phosphor-icons/react/dist/ssr";
import { useActionState, useState } from "react";
import { authenticateUser } from "../../../_lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [errorMessage, formAction, isPending] = useActionState(
    authenticateUser,
    undefined,
  );

  return (
    <Form action={formAction} validationBehavior="native">
      {errorMessage && <Alert color="warning" title={errorMessage} />}
      <Input
        isRequired
        errorMessage="El correo electrónico es invalido"
        label="Correo Electrónico"
        name="email"
        type="email"
        size="sm"
      />
      <Input
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <Eye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        name="password"
        label="Contraseña"
        size="sm"
        isRequired
        type={isVisible ? "text" : "password"}
      />
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button
        type="submit"
        className="w-full font-medium text-sm tracking-tight"
        size="sm"
        color="primary"
        variant="flat"
        isLoading={isPending}
      >
        Ingresar
      </Button>
    </Form>
  );
}
