/**
 * Represents an agriculture entity.
 *
 * @interface Agriculture
 * @property {string} [_id] - The unique identifier for the agriculture (optional).
 * @property {boolean} visible - Indicates whether the agriculture entity is visible.
 * @property {Date} day - The date of the agriculture entity.
 * @property {AgricultureLanguage} vi - The Vietnamese version of the agriculture content.
 * @property {AgricultureLanguage} jp - The Japanese version of the agriculture content.
 * @property {Date} createdAt - The date when the agriculture entity was created.
 * @property {Date} [updatedAt] - The date when the agriculture entity was last updated (optional).
 */
export interface Agriculture {
  _id?: string;
  visible: boolean;
  day: Date;
  vi: AgricultureLanguage;
  jp: AgricultureLanguage;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Represents the language-specific content of the agriculture entity.
 *
 * @interface AgricultureLanguage
 * @property {string} poster - The poster of the agriculture entity.
 * @property {Array<string>} [tag] - A list of tags associated with the agriculture entity (optional).
 * @property {string} author - The author of the agriculture content.
 * @property {string} title - The title of the agriculture content.
 * @property {string} description - The description of the agriculture content.
 * @property {Array<AgricultureItem>} agriculture - A list of agriculture items.
 */
export interface AgricultureLanguage {
  poster: string;
  tag?: Array<string>;
  author: string;
  title: string;
  description: string;
  agriculture: Array<AgricultureItem>;
}

/**
 * Represents an item within the agriculture content.
 *
 * @interface AgricultureItem
 * @property {string} [_id] - The unique identifier for the agriculture item (optional).
 * @property {string} [title] - The title of the agriculture item (optional).
 * @property {string} [topContent] - The top content of the agriculture item (optional).
 * @property {string} [italicContent] - The italic content of the agriculture item (optional).
 * @property {string} [image] - The URL of the image associated with the agriculture item (optional).
 * @property {string} [video] - The URL of the video associated with the agriculture item (optional).
 * @property {string} [pdf] - The URL of the PDF document associated with the agriculture item (optional).
 * @property {string} [youtube] - The URL of the YouTube video associated with the agriculture item (optional).
 * @property {string} [bottomContent] - The bottom content of the agriculture item (optional).
 * @property {Array<LinkGroup>} [linkGroup] - A list of link groups associated with the agriculture item (optional).
 */
export interface AgricultureItem {
  _id?: string;
  title?: string;
  topContent?: string;
  italicContent?: string;
  image?: string;
  video?: string;
  pdf?: string;
  youtube?: string;
  bottomContent?: string;
  linkGroup?: Array<LinkGroup>;
}

/**
 * Represents a group of links.
 *
 * @interface LinkGroup
 * @property {string} [content] - The content of the link (optional).
 * @property {string} [title] - The title of the link (optional).
 * @property {string} [url] - The URL of the link (optional).
 */
interface LinkGroup {
  content?: string;
  title?: string;
  url?: string;
}
