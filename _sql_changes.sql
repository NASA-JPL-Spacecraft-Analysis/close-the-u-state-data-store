ALTER TABLE `data` RENAME TO `states`;

ALTER TABLE `states`
ADD COLUMN `cpu` text DEFAULT NULL,
ADD COLUMN `hexId` text DEFAULT NULL,
ADD COLUMN `valueType` text DEFAULT NULL,
ADD COLUMN `version` text DEFAULT NULL,
ADD COLUMN `volatility` text DEFAULT NULL;

UPDATE states
SET valueType = UPPER(valueType);