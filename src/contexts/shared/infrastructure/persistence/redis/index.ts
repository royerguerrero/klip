import { Redis } from "ioredis";
import env from "@/contexts/shared/infrastructure/env";

export const redis = new Redis(env.REDIS_URL);
