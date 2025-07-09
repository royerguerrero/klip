ALTER TABLE "services" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "status" SET DEFAULT 'D'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('D', 'P', 'A');--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "status" SET DEFAULT 'D'::"public"."status";--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "team_id" uuid;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;