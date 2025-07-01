import { getCurrentUser } from "@/app/admin/(auth)/_lib/data";
import { OnboardingProvider } from "@/app/admin/onboarding/_contexts/onboarding-context";
import OnboardingContent from "@/app/admin/onboarding/_components/onboarding-content";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <OnboardingProvider>
      <OnboardingContent
        user={{ name: `${user?.firstName} ${user?.lastName}` }}
      />
    </OnboardingProvider>
  );
}
