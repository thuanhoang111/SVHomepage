/**
 * Represents a user entity.
 * 
 * @interface User
 * @property {string} [_id] - The unique identifier for the user (optional).
 * @property {string} email - The email address of the user.
 * @property {string} password - The user's password.
 * @property {boolean} verified - Indicates whether the user's email is verified.
 * @property {string} [phone] - The phone number of the user (optional).
 * @property {Date} [birthday] - The user's birthday (optional).
 * @property {Gender} [gender] - The gender of the user (optional).
 * @property {string} [avatar] - The URL of the user's avatar image (optional).
 * @property {Array<string>} role - The roles assigned to the user.
 * @property {Date} createdAt - The date when the user was created.
 * @property {Date} [updatedAt] - The date when the user was last updated (optional).
 */
export interface User {
  _id?: string;
  email: string;
  password: string;
  verified: boolean;
  phone?: string;
  birthday?: Date;
  gender?: Gender;
  avatar?: string;
  role: Array<string>;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Represents the gender of a user.
 * 
 * @enum {string}
 */
enum Gender {
  Male = "male",
  Female = "female",
}