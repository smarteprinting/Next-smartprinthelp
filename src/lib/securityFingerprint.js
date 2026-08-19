import { createHash } from 'node:crypto';

export function createSecurityFingerprint(values) {
  return createHash('sha256').update(values.join('|').toLowerCase()).digest('hex');
}