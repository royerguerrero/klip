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
    <div>
      <header className="p-3 border-b flex justify-between gap-3">
        <Image src="/klip-icon.svg" width={40} height={40} alt="Klip Logo" />
        <CommandCenter />
        <UserDropdown />
      </header>
      <TeamContextProvider teamsData={teams}>
        <div className="flex h-[93vh] bg-neutral-50">
          <Sidebar />
          <main className="w-full overflow-y-auto relative">{children}</main>
        </div>
      </TeamContextProvider>
    </div>
  );
}
