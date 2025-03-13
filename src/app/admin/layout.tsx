import Image from "next/image";
import Sidebar from "./_components/sidebar";
import UserDropdown from "./_components/user-dropdown";
import CommandCenter from "./_components/command-center";
import { TeamContextProvider } from "./_contexts/team";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="p-3 border-b flex justify-between gap-3">
        <Image src="/klip-icon.svg" width={40} height={40} alt="Klip Logo" />
        <CommandCenter />
        <UserDropdown />
      </header>
      <TeamContextProvider teamsData={teams}>
        <div className="flex bg-neutral-50 border border-lime-500 h-full">
          <Sidebar />
          <main className="w-full">{children}</main>
        </div>
      </TeamContextProvider>
    </div>
  );
}
