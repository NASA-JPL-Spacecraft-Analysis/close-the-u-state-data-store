CREATE TABLE `states` (
  `collectionName` text CHARACTER SET utf8,
  `ert` datetime(3) DEFAULT NULL,
  `id` text CHARACTER SET utf8 NOT NULL,
  `metadata` json DEFAULT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `planId` text CHARACTER SET utf8,
  `runId` text CHARACTER SET utf8,
  `scet` datetime(3) NOT NULL,
  `scetEnd` datetime(3) DEFAULT NULL,
  `sessionId` text CHARACTER SET utf8,
  `type` text CHARACTER SET utf8,
  `value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `events` (
  `collectionName` text,
  `ert` datetime(3) DEFAULT NULL,
  `id` text CHARACTER SET utf8 NOT NULL,
  `metadata` json DEFAULT NULL,
  `message` text CHARACTER SET utf8 NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `planId` text CHARACTER SET utf8,
  `runId` text,
  `scet` datetime(3) NOT NULL,
  `scetEnd` datetime(3) DEFAULT NULL,
  `sessionId` text CHARACTER SET utf8,
  `type` text CHARACTER SET utf8
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE
  `vector_slot` (
    `id` varchar(36) NOT NULL,
    `endTdt` text DEFAULT NULL,
    `base` text NOT NULL,
    `head` text NOT NULL,
    `vectorSlot` text NOT NULL,
    `order` text DEFAULT NULL,
    `startTdt` text DEFAULT NULL,
    `applicableTime` datetime(3) DEFAULT NULL,
    `status` text NOT NULL,
    `type` text DEFAULT NULL,
    `valueType` text DEFAULT NULL,
    `x_coefficients` json DEFAULT NULL,
    `y_coefficients` json DEFAULT NULL,
    `z_coefficients` json DEFAULT NULL,
    `collectionName` text DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
