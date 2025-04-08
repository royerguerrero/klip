import { auth } from "@/app/auth";
import Heading from "../_components/heading";
import { nextEvents } from "./_lib/data";

export default async function Page() {
  const session = await auth();
  console.log("session >>>", session);
  const events = await nextEvents(session?.user?.id || "");
  console.log("events >>>", events);

  return (
    <div className="py-2">
      <Heading title="Próximos eventos"></Heading>
      <section className="p-3 w-full border"></section>
    </div>
  );
}
