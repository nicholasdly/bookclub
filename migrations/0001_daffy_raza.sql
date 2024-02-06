CREATE TABLE `bookclub_follows` (
	`id` varchar(12) NOT NULL,
	`followerUserId` varchar(100) NOT NULL,
	`followingUserId` varchar(100) NOT NULL,
	CONSTRAINT `bookclub_follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookclub_likes` (
	`id` varchar(12) NOT NULL,
	`userId` varchar(100) NOT NULL,
	`postId` varchar(12) NOT NULL,
	CONSTRAINT `bookclub_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `followerUserId_idx` ON `bookclub_follows` (`followerUserId`);--> statement-breakpoint
CREATE INDEX `followingUserId_idx` ON `bookclub_follows` (`followingUserId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `bookclub_likes` (`userId`);--> statement-breakpoint
CREATE INDEX `postId_idx` ON `bookclub_likes` (`postId`);