CREATE TABLE "site_config" (
	"id" varchar PRIMARY KEY DEFAULT 'default' NOT NULL,
	"site_name" text DEFAULT 'SRPH MIS' NOT NULL,
	"site_tagline" text DEFAULT 'Employee Portal' NOT NULL,
	"nav_items" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cta_button_text" text DEFAULT 'IT Support' NOT NULL,
	"cta_button_link" text DEFAULT '/support' NOT NULL,
	"hero_title_1" text DEFAULT 'Welcome to' NOT NULL,
	"hero_title_2" text DEFAULT 'SRPH MIS Portal' NOT NULL,
	"hero_description" text DEFAULT 'Your one-stop access to all enterprise applications, tools, and resources.' NOT NULL,
	"hero_primary_btn" text DEFAULT 'Browse All Systems' NOT NULL,
	"hero_secondary_btn" text DEFAULT 'IT Support' NOT NULL,
	"stats" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"categories" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"footer_copyright" text DEFAULT '© 2024 SRPH MIS. All rights reserved.' NOT NULL,
	"featured_categories" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"chat_api_key" text DEFAULT '' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
