const uuid = require("uuid-v4");

export function generateUuid(): string {
  return uuid();
}
