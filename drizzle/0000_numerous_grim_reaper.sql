CREATE TABLE "hero_content" (
	"key" text PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"date" text NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"author" text DEFAULT '' NOT NULL,
	"author_role" text DEFAULT '' NOT NULL,
	"author_bio" text DEFAULT '' NOT NULL,
	"author_image" text,
	"color" text DEFAULT 'yellow' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
