import { db } from "@/contexts/shared/infrastructure/persistence/drizzle";
import { getCurrentUserSession } from "@/app/admin/(auth)/_lib/data";
import { DrizzleServiceRepository } from "@/contexts/services/infrastructure/persistence/drizzle/DrizzleServiceRepository";
import { ServiceSearcher } from "@/contexts/services/application/ServiceSearcher";
import { ServiceFinder } from "@/contexts/services/application/ServiceFinder";

export async function listServices() {
  const currentUser = await getCurrentUserSession({
    redirectIfNotFound: true,
    redirectIfOnboardingNotCompleted: true,
  });

  const searcher = new ServiceSearcher(new DrizzleServiceRepository(db));
  const { services } = await searcher.search(
    currentUser.organization.currentTeam.id
  );

  return services?.map((service) => service.toPrimitives()) ?? [];
}

export async function retrieveService(serviceId: string) {
  const currentUser = await getCurrentUserSession({
    redirectIfNotFound: true,
    redirectIfOnboardingNotCompleted: true,
  });

  const finder = new ServiceFinder(new DrizzleServiceRepository(db));

  const { service } = await finder.find(
    currentUser.organization.currentTeam.id,
    serviceId
  );

  return service?.toPrimitives() ?? null;
}
