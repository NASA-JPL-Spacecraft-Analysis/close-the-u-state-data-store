
ALTER TABLE `states`
ADD COLUMN  `collectionName` text DEFAULT NULL,
ADD COLUMN  `type` text,
ADD COLUMN  `scetEnd` datetime(3) DEFAULT NULL;
