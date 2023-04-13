import { VALUE_TYPE } from './enums'

export const STATE_TYPES: Set<string> = new Set([
    'activity_instance',
    'alarm_limit',
    'channel',
    'channel_alarm',
    'fsw_parameter',
    'predict',
    'trend',
    'user'
]);

export const CHANNEL_TYPES: Set<string> = new Set([
    VALUE_TYPE.DERIVED,
    VALUE_TYPE.MEASURED,
    VALUE_TYPE.PREDICTED
]);

export const TRENDS_TYPES: Set<string> = new Set([
    VALUE_TYPE.DERIVED
]);

export const PREDICT_TYPES: Set<string> = new Set([
    VALUE_TYPE.PREDICTED
]);

export const FSW_PARAMETER_TYPES: Set<string> = new Set([
    VALUE_TYPE.MEASURED,
    VALUE_TYPE.PREDICTED
]);

export const EVENT_TYPES: Set<string> = new Set([
    'evr',
    'predict_event',
    'user'
]);
