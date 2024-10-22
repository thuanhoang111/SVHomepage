/**
 * Represents a user verification entity.
 *
 * @interface UserVerification
 * @property {string} [_id] - The unique identifier for the user verification (optional).
 * @property {string} userId - The unique identifier of the user being verified.
 * @property {string} uniqueString - A unique string used for verification purposes.
 * @property {string} createdAt - The date and time when the verification was created, in ISO 8601 format.
 * @property {Date} expiresAt - The date and time when the verification expires.
 * @property {string} urlRedirect - The URL to which the user will be redirected after verification.
 */
export interface UserVerification {
  _id?: string;
  userId: string;
  uniqueString: string;
  createdAt: string;
  expiresAt: Date;
  urlRedirect: string;
}
