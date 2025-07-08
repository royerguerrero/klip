ALTER TYPE "public"."identity_document_types" ADD VALUE 'ci';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'rut';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'cc';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'ce';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'ti';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'cedula';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'dui';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'nie';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'dpi';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'ine';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'curp';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'ssn';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'drivers_license';--> statement-breakpoint
ALTER TYPE "public"."identity_document_types" ADD VALUE 'state_id';--> statement-breakpoint
ALTER TABLE "customers" RENAME COLUMN "created_at" TO "added_at";--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "identity_document" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "identity_document_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "phone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "team_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "archived" boolean DEFAULT false NOT NULL;