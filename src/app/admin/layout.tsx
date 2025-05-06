import Image from "next/image";
import Sidebar from "./_components/sidebar";
import UserDropdown from "./_components/user-dropdown";
import CommandCenter from "./_components/command-center";
import { Team, TeamContextProvider } from "./_contexts/team";
import { auth } from "../auth";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const session = await auth();
  const teams = session?.user.teams as Team[];

  return (
    <div className="h-dvh min-h-dvh flex flex-col relative">
      <header className="p-3 border-b flex justify-between gap-3">
        <Image src="/klip-icon.svg" width={36} height={36} alt="Klip Logo" />
        <CommandCenter />
        <UserDropdown />
      </header>
      <TeamContextProvider teamsData={teams}>
        <div className="flex h-full bg-neutral-50">
          <Sidebar />
          <main className="w-full overflow-y-auto relative">{children}</main>
        </div>
      </TeamContextProvider>
    </div>
  );
}
