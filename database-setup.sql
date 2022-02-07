CREATE TABLE `data` (
  `collectionId` text CHARACTER SET utf8,
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
  `collectionId` text,
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
