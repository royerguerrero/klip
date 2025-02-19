import { Suspense } from "react";
import LoginForm from "./_components/forms/login";

export default async function Page() {
  return (
    <section className="border rounded-xl p-4 m-4 mx-auto w-96">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
