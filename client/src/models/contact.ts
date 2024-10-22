/**
 * Represents a contact entity.
 *
 * @interface Contact
 * @property {string} [_id] - The unique identifier for the contact (optional).
 * @property {boolean} default - Indicates whether this contact information is the default.
 * @property {ContactLanguage} vi - The contact information in Vietnamese.
 * @property {ContactLanguage} jp - The contact information in Japanese.
 * @property {Date} createdAt - The date and time when the contact information was created.
 * @property {Date} [updatedAt] - The date and time when the contact information was last updated (optional).
 */
export interface Contact {
  _id?: string;
  default: boolean;
  vi: ContactLanguage;
  jp: ContactLanguage;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Represents the contact information in a specific language.
 *
 * @interface ContactLanguage
 * @property {string} address - The contact address.
 * @property {string} phone - The contact phone number.
 * @property {string} email - The contact email address.
 */
interface ContactLanguage {
  address: string;
  phone: string;
  email: string;
}
