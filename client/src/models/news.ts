/**
 * Represents a news entity.
 *
 * @interface News
 * @property {string} [_id] - The unique identifier for the news (optional).
 * @property {boolean} visible - Indicates whether the news is visible.
 * @property {Date} day - The date of the news.
 * @property {NewsLanguage} vi - The Vietnamese version of the news.
 * @property {NewsLanguage} jp - The Japanese version of the news.
 * @property {Date} createdAt - The date when the news was created.
 * @property {Date} [updatedAt] - The date when the news was last updated (optional).
 */
export interface News {
  _id?: string;
  visible: boolean;
  day: Date;
  vi: NewsLanguage;
  jp: NewsLanguage;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Represents the language-specific content of the news.
 *
 * @interface NewsLanguage
 * @property {string} [_id] - The unique identifier for the news language (optional).
 * @property {string} title - The title of the news.
 * @property {string} poster - The poster of the news.
 * @property {string} [description] - The description of the news (optional).
 * @property {Array<NewsItem>} news - The items related to the news.
 */
export interface NewsLanguage {
  _id?: string;
  title: string;
  poster: string;
  description?: string;
  news: Array<NewsItem>;
}

/**
 * Represents an item within the news.
 *
 * @interface NewsItem
 * @property {string} [_id] - The unique identifier for the news item (optional).
 * @property {string} [imageCenter] - The URL of the center image (optional).
 * @property {string} [imageLeft] - The URL of the left image (optional).
 * @property {string} [imageRight] - The URL of the right image (optional).
 * @property {Array<ImageGroup>} [imageGroup] - A group of image URLs (optional).
 * @property {string} [contentCenter] - The center-aligned content (optional).
 * @property {string} [content] - The main content (optional).
 * @property {string} [youtube] - The URL of the YouTube video (optional).
 * @property {string} [video] - The URL of the video (optional).
 * @property {string} [pdf] - The URL of the PDF document (optional).
 * @property {Array<Table>} [table] - A list of tables (optional).
 * @property {Array<LinkGroup>} [linkGroup] - A group of links (optional).
 */
export interface NewsItem {
  _id?: string;
  imageCenter?: string;
  imageLeft?: string;
  imageRight?: string;
  imageGroup?: Array<ImageGroup>;
  contentCenter?: string;
  content?: string;
  youtube?: string;
  video?: string;
  pdf?: string;
  table?: Array<Table>;
  linkGroup?: Array<LinkGroup>;
}

/**
 * Represents a group of images.
 *
 * @interface ImageGroup
 * @property {string} url - The URL of the image.
 */
export interface ImageGroup {
  url: string;
}

/**
 * Represents a table within a news item.
 *
 * @interface Table
 * @property {string} title - The title of the table.
 * @property {string} content - The content of the table.
 */
export interface Table {
  title: string;
  content: string;
}

/**
 * Represents a group of links.
 *
 * @interface LinkGroup
 * @property {string} content - The content of the link.
 * @property {string} title - The title of the link.
 * @property {string} url - The URL of the link.
 */
export interface LinkGroup {
  content: string;
  title: string;
  url: string;
}
