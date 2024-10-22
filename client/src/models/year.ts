/**
 * Represents a year with related information.
 *
 * @interface Year
 * @property {string} [_id] - The unique identifier for the year (optional).
 * @property {number} year - The year represented by this object.
 * @property {boolean} isActive - Indicates whether the year is currently active.
 * @property {number} totalNews - The total number of news items for the year.
 */
export interface Year {
  _id?: string;
  year: number;
  isActive: boolean;
  totalNews: number;
}
