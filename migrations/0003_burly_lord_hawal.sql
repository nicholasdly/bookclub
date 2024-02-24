ALTER TABLE `bookclub_replies` MODIFY COLUMN `parentId` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookclub_reposts` MODIFY COLUMN `parentId` varchar(20) NOT NULL;