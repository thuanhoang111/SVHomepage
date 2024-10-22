/**
 * Represents a password reset entity.
 *
 * @interface PasswordReset
 * @property {string} [_id] - The unique identifier for the password reset request (optional).
 * @property {string} userId - The unique identifier of the user requesting the password reset.
 * @property {string} resetString - A unique string used for resetting the password.
 * @property {Date} createdAt - The date and time when the password reset request was created.
 * @property {Date} expiresAt - The date and time when the password reset request expires.
 */
export interface PasswordReset {
  _id?: string;
  userId: string;
  resetString: string;
  createdAt: Date;
  expiresAt: Date;
}
