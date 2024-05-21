import { VALUE_TYPE } from './enums';

export const STATE_VALUE_TYPES: Record<string, Array<String>> = {
  channel: [VALUE_TYPE.DERIVED, VALUE_TYPE.MEASURED, VALUE_TYPE.PREDICTED],
  fsw_parameter: [VALUE_TYPE.MEASURED, VALUE_TYPE.PREDICTED],
  predict: [VALUE_TYPE.PREDICTED],
  trend: [VALUE_TYPE.DERIVED]
};

export const STATE_TYPES: Set<string> = new Set([
  'alarm_limit',
  'channel',
  'channel_alarm',
  'fsw_parameter',
  'model_input',
  'predict',
  'trend',
  'user'
]);

export const EVENT_TYPES: Set<string> = new Set(['evr', 'predict_event', 'user']);
