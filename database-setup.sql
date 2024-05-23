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
  `value` double NOT NULL,
  `cpu` text DEFAULT NULL,
  `hexId` text DEFAULT NULL,
  `valueType` text DEFAULT NULL,
  `version` text DEFAULT NULL,
  `volatility` text DEFAULT NULL,
  `fswParamVersion` text DEFAULT NULL
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
    `gravitational_parameter_m3_per_s2` text DEFAULT NULL,
    `initial_position_coefficients_m` json DEFAULT NULL,
    `initial_velocity_coefficients_mps` json DEFAULT NULL,
    `vectorSlot` text NOT NULL,
    `order` text DEFAULT NULL,
    `startTdt` text DEFAULT NULL,
    `applicableTime` datetime(3) DEFAULT NULL,
    `applicableEndTime` datetime(3) DEFAULT NULL,
    `status` text NOT NULL,
    `type` text DEFAULT NULL,
    `validityTime` datetime(3) DEFAULT NULL,
    `valueType` text DEFAULT NULL,
    `x_coefficients` json DEFAULT NULL,
    `y_coefficients` json DEFAULT NULL,
    `z_coefficients` json DEFAULT NULL,
    `xyz_coefficients` json DEFAULT NULL,
    `collectionName` text DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8;
