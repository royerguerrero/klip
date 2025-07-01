import { z } from "zod";
import crypto from "crypto";
import { redis } from "@/contexts/shared/infrastructure/persistence/redis";

const COOKIE_SESSION_KEY = "user-auth-session-id";
const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 30; // 30 days

const sessionSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpsOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  redis.set(
    `user:session:${sessionId}`,
    JSON.stringify(sessionSchema.parse(user)),
    "EX",
    SESSION_EXPIRATION_TIME
  );

  setCookie(sessionId, cookies);
}

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return;

  await redis.del(`user:session:${sessionId}`);
  removeCookie(cookies);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpsOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_TIME * 1000,
  });
}

function removeCookie(cookies: Pick<Cookies, "delete">) {
  cookies.delete(COOKIE_SESSION_KEY);
}

async function getUserSessionById(sessionID: string) {
  const rawUser = await redis.get(`user:session:${sessionID}`);
  const { success, data: user } = sessionSchema.safeParse(
    JSON.parse(rawUser || "")
  );

  return success ? user : null;
}
