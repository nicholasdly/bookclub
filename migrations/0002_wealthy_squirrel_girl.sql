CREATE TABLE `bookclub_replies` (
	`id` varchar(20) NOT NULL,
	`parentId` varchar(20),
	`userId` varchar(100) NOT NULL,
	`content` varchar(280) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `bookclub_replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookclub_reposts` (
	`id` varchar(20) NOT NULL,
	`parentId` varchar(20),
	`userId` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `bookclub_reposts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `bookclub_follows` RENAME COLUMN `followerUserId` TO `followerId`;--> statement-breakpoint
ALTER TABLE `bookclub_follows` RENAME COLUMN `followingUserId` TO `followingId`;--> statement-breakpoint
ALTER TABLE `bookclub_likes` RENAME COLUMN `postId` TO `parentId`;--> statement-breakpoint
ALTER TABLE `bookclub_posts` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE `bookclub_users` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
DROP INDEX `followerUserId_idx` ON `bookclub_follows`;--> statement-breakpoint
DROP INDEX `followingUserId_idx` ON `bookclub_follows`;--> statement-breakpoint
DROP INDEX `postId_idx` ON `bookclub_likes`;--> statement-breakpoint
DROP INDEX `parentId_idx` ON `bookclub_posts`;--> statement-breakpoint
DROP INDEX `type_idx` ON `bookclub_posts`;--> statement-breakpoint
ALTER TABLE `bookclub_follows` MODIFY COLUMN `id` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookclub_likes` MODIFY COLUMN `id` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookclub_likes` MODIFY COLUMN `parentId` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookclub_posts` MODIFY COLUMN `id` varchar(20) NOT NULL;--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bookclub_replies` (`userId`);--> statement-breakpoint
CREATE INDEX `parentId_idx` ON `bookclub_replies` (`parentId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bookclub_reposts` (`userId`);--> statement-breakpoint
CREATE INDEX `parentId_idx` ON `bookclub_reposts` (`parentId`);--> statement-breakpoint
CREATE INDEX `followerId_idx` ON `bookclub_follows` (`followerId`);--> statement-breakpoint
CREATE INDEX `followingId_idx` ON `bookclub_follows` (`followingId`);--> statement-breakpoint
CREATE INDEX `parentId_idx` ON `bookclub_likes` (`parentId`);--> statement-breakpoint
ALTER TABLE `bookclub_posts` DROP COLUMN `parentId`;--> statement-breakpoint
ALTER TABLE `bookclub_posts` DROP COLUMN `type`;