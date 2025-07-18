CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" varchar(255) NOT NULL,
	"input_type" varchar(255) NOT NULL,
	"required" boolean NOT NULL,
	"order" integer NOT NULL,
	"options" jsonb,
	"service_id" uuid
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;