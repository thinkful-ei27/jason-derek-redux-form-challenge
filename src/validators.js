export const required = value => value ? undefined : 'Required';

export const trackingLength = value => value.length === 5 ? undefined: 'Tracking number must be 5 characters';

export const mustBeNumber = value => Number(value) ? undefined : 'Each character must be a number';