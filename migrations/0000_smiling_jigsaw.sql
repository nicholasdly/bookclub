CREATE TABLE `bookclub_posts` (
	`id` varchar(12) NOT NULL,
	`parentId` varchar(12),
	`userId` varchar(100) NOT NULL,
	`content` varchar(280) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`type` enum('post','reply','repost') NOT NULL DEFAULT 'post',
	CONSTRAINT `bookclub_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookclub_users` (
	`id` varchar(100) NOT NULL,
	`username` varchar(64) NOT NULL,
	`email` varchar(320) NOT NULL,
	`bio` varchar(160) NOT NULL DEFAULT '',
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`imageUrl` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`type` enum('user','developer','author') NOT NULL DEFAULT 'user',
	CONSTRAINT `bookclub_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `bookclub_users_username_unique` UNIQUE(`username`),
	CONSTRAINT `bookclub_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bookclub_posts` (`userId`);--> statement-breakpoint
CREATE INDEX `parentId_idx` ON `bookclub_posts` (`parentId`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `bookclub_posts` (`type`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bookclub_users` (`id`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `bookclub_users` (`username`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `bookclub_users` (`type`);