CREATE TABLE "article" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"summary" text,
	"url" varchar(1000) NOT NULL,
	"imageUrl" varchar(1000),
	"source" varchar(255) NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "article_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"article_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "bookmarks_user_id_article_id_unique" UNIQUE("user_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "userPreference" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "userPreference_user_id_category_id_unique" UNIQUE("user_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPreference" ADD CONSTRAINT "userPreference_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPreference" ADD CONSTRAINT "userPreference_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;