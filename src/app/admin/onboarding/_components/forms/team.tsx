"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamSchema } from "./schemas";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Icon } from "@iconify-icon/react";
import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/_components/ui/select";

interface TeamFormProps {
  onNext: (data: z.infer<typeof teamSchema>) => void;
  defaultValues?: z.infer<typeof teamSchema>;
}

export default function TeamForm({ onNext, defaultValues }: TeamFormProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: defaultValues || {
      team: {
        name: "",
        members: [],
      },
    },
  });

  const onSubmit = (data: z.infer<typeof teamSchema>) => {
    onNext(data);
  };

  const handleInvite = () => {
    if (inviteEmail.trim() !== "") {
      const currentMembers = form.getValues("team.members");
      form.setValue("team.members", [
        ...currentMembers,
        {
          email: inviteEmail,
          role: "staff",
        },
      ]);
      setInviteEmail("");
    }
  };

  const removeMember = (index: number) => {
    const currentMembers = form.getValues("team.members");
    if (currentMembers.length > 1) {
      form.setValue(
        "team.members",
        currentMembers.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="team.name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Nombre del equipo *" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div>
            <h3 className="text-base font-semibold">
              Invita a los miembros del equipo
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              Enviaremos las instruciones y link de acceso a la plataforma
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Ingresa el correo electrónico"
              className="w-full h-8"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleInvite();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={handleInvite}>
              Invitar
            </Button>
          </div>
          <ScrollArea className="w-full h-[200px] border-y border-muted">
            {form.watch("team.members").map((member, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg first:mt-1 last:mb-2"
              >
                <FormField
                  control={form.control}
                  name={`team.members.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="relative w-full ml-1">
                      <Avatar className="size-8 absolute left-1 top-1">
                        <AvatarFallback className="text-sm text-muted-foreground font-medium">
                          {member.email?.[0]?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-transparent border-0 pl-12"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`team.members.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-auto bg-transparent border-0 appearance-none text-sm text-muted-foreground focus:ring-0">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMember(index)}
                  className="size-8"
                >
                  <Icon
                    icon="ph:trash-simple-bold"
                    height={16}
                    className="text-muted-foreground"
                  />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>

        <Button type="submit" variant="secondary" className="w-full mt-2">
          Siguiente
        </Button>
      </form>
    </Form>
  );
}
