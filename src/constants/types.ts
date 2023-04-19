import { VALUE_TYPE } from './enums'

export const STATE_VALIDATED_TYPES: Record<string, string> = {
    channel: 'channel',
    fsw_parameter: 'fsw_parameter',
    predict: 'predict',
    trend: 'trend'
}

export const CHANNEL_TYPES: Set<string> = new Set([
    VALUE_TYPE.DERIVED,
    VALUE_TYPE.MEASURED,
    VALUE_TYPE.PREDICTED
]);

export const FSW_PARAMETER_TYPES: Set<string> = new Set([
    VALUE_TYPE.MEASURED,
    VALUE_TYPE.PREDICTED
]);

export const PREDICT_TYPES: Set<string> = new Set([
    VALUE_TYPE.PREDICTED
]);

export const TREND_TYPES: Set<string> = new Set([
    VALUE_TYPE.DERIVED
]);

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

export const EVENT_TYPES: Set<string> = new Set([
    'evr',
    'predict_event',
    'user'
]);
