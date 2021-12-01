CREATE TABLE `data` (
  `ert` datetime(3) DEFAULT NULL,
  `name` text NOT NULL,
  `scet` datetime(3) NOT NULL,
  `value` double NOT NULL,
  `metadata` json DEFAULT NULL,
  `planId` text ,
  `runId` text ,
  `sessionId` text 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `events` (
  `ert` datetime(3) DEFAULT NULL,
  `id` text NOT NULL,
  `message` text NOT NULL,
  `name` text NOT NULL,
  `planId` text ,
  `scet` datetime(3) NOT NULL,
  `scetEnd` datetime(3) DEFAULT NULL,
  `sessionId` text ,
  `recordType` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

