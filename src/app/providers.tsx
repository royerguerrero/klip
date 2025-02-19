import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider className="font-sans">{children}</HeroUIProvider>;
}
