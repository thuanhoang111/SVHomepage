/**
 * Represents a user login session or request.
 *
 * @interface UserLogin
 * @property {string} [_id] - The unique identifier for the user login session (optional).
 * @property {string} userId - The unique identifier of the user associated with the login session.
 * @property {string} loginString - A unique string used for login verification.
 * @property {Date} createdAt - The date and time when the login session was created.
 * @property {Date} expiresAt - The date and time when the login session expires.
 */
export interface UserLogin {
  _id?: string;
  userId: string;
  loginString: string;
  createdAt: Date;
  expiresAt: Date;
}
