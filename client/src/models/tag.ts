/**
 * Represents a tag entity.
 *
 * @interface Tag
 * @property {string} [_id] - The unique identifier for the tag (optional).
 * @property {boolean} visible - Indicates whether the tag is visible.
 * @property {string} vi - The tag name in Vietnamese.
 * @property {string} jp - The tag name in Japanese.
 * @property {Date} createdAt - The date when the tag was created.
 * @property {Date} [updatedAt] - The date when the tag was last updated (optional).
 */
export interface Tag {
  _id?: string;
  visible: boolean;
  vi: string;
  jp: string;
  createdAt: Date;
  updatedAt?: Date;
}
