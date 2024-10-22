/**
 * Represents a partner entity.
 * 
 * @interface Partner
 * @property {string} [_id] - The unique identifier for the partner (optional).
 * @property {boolean} visible - Indicates whether the partner is visible.
 * @property {Image} image - The image associated with the partner.
 */
export interface Partner {
  _id?: string;
  visible: boolean;
  image: Image;
}

/**
 * Represents an image object.
 * 
 * @interface Image
 * @property {*} data - The image data.
 * @property {string} contentType - The MIME type of the image.
 */
interface Image {
  data: any;
  contentType: string;
}