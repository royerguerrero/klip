"use client";

import { Form } from "@heroui/form";
import { Button, Input, InputOtp } from "@heroui/react";
import { useState } from "react";
import { resetPasswordWithEmailCode } from "../../../_lib/actions";
import {
  ArrowCounterClockwise,
  Eye,
  EyeClosed,
} from "@phosphor-icons/react/dist/ssr";

export default function ResetPasswordForm() {
  const [errors, setErrors] = useState({});
  const [successfulGeneratedCode, setSuccessfulGeneratedCode] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = await resetPasswordWithEmailCode(data);

    console.log(errors);
    if (Object.keys(errors).length === 0) {
      setSuccessfulGeneratedCode(true);
    } else {
      setErrors(errors);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationBehavior="native"
      validationErrors={errors}
    >
      {!successfulGeneratedCode && (
        <>
          <Input
            isRequired
            errorMessage="El correo electrónico es invalido"
            label="Correo Electrónico"
            name="email"
            type="email"
            size="sm"
          />
          <Button
            type="submit"
            className="w-full font-medium text-sm tracking-tight"
            size="sm"
            color="primary"
            variant="flat"
          >
            Enviar enlace de recuperación
          </Button>
        </>
      )}
      {successfulGeneratedCode && (
        <>
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
          <div className="flex gap-2 items-center justify-center">
            <InputOtp
              name="code"
              isRequired
              length={6}
            />
            <Button variant="flat" radius="sm">
              <ArrowCounterClockwise className="text-xl text-default-400" />
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full font-medium text-sm tracking-tight"
            size="sm"
            color="primary"
            variant="flat"
          >
            Cambiar contraseña
          </Button>
        </>
      )}
    </Form>
  );
}
