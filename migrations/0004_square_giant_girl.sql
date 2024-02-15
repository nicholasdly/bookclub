DROP TABLE `bookclub_replies`;--> statement-breakpoint
ALTER TABLE `bookclub_posts` ADD `type` enum('post','reply') DEFAULT 'post' NOT NULL;--> statement-breakpoint
ALTER TABLE `bookclub_posts` ADD `parentId` varchar(20);--> statement-breakpoint
CREATE INDEX `parentId_idx` ON `bookclub_posts` (`parentId`);