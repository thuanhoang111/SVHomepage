/**
 * Represents a cooperative entity.
 *
 * @interface Cooperative
 * @property {string} [_id] - The unique identifier for the cooperative (optional).
 * @property {string} image - The URL of the image associated with the cooperative.
 * @property {boolean} visible - Indicates whether the cooperative is visible.
 * @property {Date} createdAt - The date and time when the cooperative was created.
 * @property {Date} [updatedAt] - The date and time when the cooperative was last updated (optional).
 */
export interface Cooperative {
  _id?: string;
  image: string;
  visible: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
