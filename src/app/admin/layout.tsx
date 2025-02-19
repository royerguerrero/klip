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
      <TeamContextProvider
        teamsData={[
          { id: "898989", name: "Default Team" },
          { id: "123456", name: "New Team" },
        ]}
      >
        <div className="flex h-[93vh] bg-neutral-50">
          <Sidebar />
          <main className="w-full">{children}</main>
        </div>
      </TeamContextProvider>
    </div>
  );
}
