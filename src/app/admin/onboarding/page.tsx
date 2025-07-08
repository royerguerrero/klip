import { getCurrentUserSession } from "@/app/admin/(auth)/_lib/data";
import { OnboardingProvider } from "@/app/admin/onboarding/_contexts/onboarding-context";
import OnboardingContent from "@/app/admin/onboarding/_components/onboarding-content";

export default async function Page() {
  const user = await getCurrentUserSession();
  console.log("user >>>!", user);

  return (
    <OnboardingProvider>
      <OnboardingContent
        user={{ 
          name: `${user?.user.firstName} ${user?.user.lastName}` 
        }}
      />
    </OnboardingProvider>
  );
}
