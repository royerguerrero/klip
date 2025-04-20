import * as readline from "readline";
import { UserId } from "./src/contexts/backoffice/user/domain/UserId";
import { Bootstrap } from "./src/contexts/shared/infrastructure/Bootstrap";
import { UserRegistry } from "./src/contexts/backoffice/user/infrastructure/UserRegistry";
import { RegisterUserCommand } from "./src/contexts/backoffice/user/application/register/RegisterUserCommand";
import { ServiceRegistry } from "./src/contexts/backoffice/service/infrastructure/ServiceRegistry";
import { CreateServiceCommand } from "./src/contexts/backoffice/service/application/create/CreateServiceCommand";
import { DrizzleUserRepository } from "./src/contexts/backoffice/user/infrastructure/persistence/drizzle/DrizzleUserRepository";
import { Email } from "./src/contexts/shared/domain/value-object/Email";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "<3 ",
});

console.log("Klip Playground - Type Typescript commands here");

const bootstrap = new Bootstrap([new UserRegistry(), new ServiceRegistry()]);

// const createUser = async () => {
//   const cmd = new RegisterUserCommand(
//     UserId.nextId().value,
//     "Royer",
//     "Guerrero",
//     "royer.guerrero@klip.is",
//     "password123",
//     {
//       id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
//       teams: [
//         {
//           id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
//           permissions: [],
//         },
//       ],
//     },
//   );
//   await bootstrap.commandBus.dispatch(cmd);
// };

const createAcademiaPatryRitchyOnboarding = async () => {
  const onboarding = {
    id: "",
  };
};

const createAcademiaPatryRitchyServices = async () => {
  const services = [
    {
      fingerprint: "tecnico-manos-y-pies",
      title: "Técnico en cuidado estético de manos y pies",
      description:
        "Especialízate en manicure, pedicure y técnicas spa, embelleciendo y cuidando manos y pies con resultados profesionales.",
      category: "programas",
      duration: 6 * 30 * 24,
      availability: [
        {
          name: "Mañana",
          repeat: "Mon-Sat",
          form: "09:00",
          to: "12:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Tarde",
          repeat: "Mon-Sat",
          form: "14:00",
          to: "17:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Noche",
          repeat: "Mon-Sat",
          form: "17:00",
          to: "20:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
      ],
      payments: {
        type: "installments",
        price: {
          currency: "COP",
          value: 1200000,
        },
        options: {
          installments: 6,
        },
      },
      company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
    },
    {
      fingerprint: "tecnico-peluqueria",
      title: "Técnico Peluquería",
      description:
        "Domina corte, color y técnicas de estilismo para brindar un servicio integral en peluquería moderna.",
      category: "programas",
      availability: [
        {
          name: "Mañana",
          repeat: "Mon-Sat",
          form: "09:00",
          to: "12:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Tarde",
          repeat: "Mon-Sat",
          form: "14:00",
          to: "17:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Noche",
          repeat: "Mon-Sat",
          form: "17:00",
          to: "20:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
      ],
      payments: {
        type: "installments",
        price: {
          currency: "COP",
          value: 2100000,
        },
        options: {
          installments: 10,
          paymentPromiseEach: 30,
        },
      },
      company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
    },
    {
      fingerprint: "tecnico-maquillaje",
      title: "Técnico en Maquillaje",
      description:
        "Aprende correcciones, teoría del color y técnicas avanzadas, creando maquillajes perfectos para cada ocasión.",
      category: "programas",
      availability: [
        {
          name: "Mañana",
          repeat: "Mon-Sat",
          form: "09:00",
          to: "12:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Tarde",
          repeat: "Mon-Sat",
          form: "14:00",
          to: "17:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
      ],
      payments: {
        type: "installments",
        price: {
          currency: "COP",
          value: 1800000,
        },
        options: {
          installments: 6,
        },
      },
      company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
    },
    {
      fingerprint: "tecnico-barberia",
      title: "Técnico en Barbería",
      description:
        "Domina cortes, afeitados y estilos contemporáneos, ofreciendo un servicio de barbería moderno e integral.",
      category: "programas",
      availability: [
        {
          name: "Mañana",
          repeat: "Mon-Sat",
          form: "09:00",
          to: "12:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
        {
          name: "Noche",
          repeat: "Mon-Fri",
          form: "17:00",
          to: "20:00",
          locations: [
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
            {
              type: "inPerson",
              options: {
                address: "8712cbdd-cda1-4889-97ec-2547110660a7",
                maxCapacity: 15,
              },
            },
          ],
        },
      ],
      payments: {
        type: "installments",
        price: {
          currency: "COP",
          value: 1800000,
        },
        options: {
          installments: 6,
        },
      },
      company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
    },
  ];
  console.log(services);
};

// createUser();

// (async () => {
//   const repo = new DrizzleUserRepository();
//   const user = await repo.getByEmail(new Email("royer.guerrero@klip.is"));
//   console.log(user);
// })();

rl.prompt();
rl.on("line", async (line) => {
  try {
    const result = eval(line);
    if (result instanceof Promise) {
      console.log(await result);
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
  rl.prompt();
});
