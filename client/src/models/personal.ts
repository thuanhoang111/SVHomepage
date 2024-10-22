/**
 * Represents personal information associated with an individual.
 *
 * @interface Personal
 * @property {string} [_id] - The unique identifier for the personal information (optional).
 * @property {string} avatar - The URL of the avatar image associated with the personal information.
 * @property {PersonalLanguage} vi - The personal information in Vietnamese.
 * @property {PersonalLanguage} jp - The personal information in Japanese.
 * @property {Date} createdAt - The date and time when the personal information was created.
 * @property {Date} [updatedAt] - The date and time when the personal information was last updated (optional).
 */
export interface Personal {
  _id?: string;
  avatar: string;
  vi: PersonalLanguage;
  jp: PersonalLanguage;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Represents personal information in a specific language.
 *
 * @interface PersonalLanguage
 * @property {string} department - The department the individual is associated with.
 * @property {string} title - The title of the individual.
 * @property {string} content - Additional content or description about the individual.
 * @property {string} possition - The position or role of the individual.
 * @property {string} name - The name of the individual.
 */
interface PersonalLanguage {
  department: string;
  title: string;
  content: string;
  possition: string;
  name: string;
}
