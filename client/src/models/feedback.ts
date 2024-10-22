export interface Feedback {
  _id?: string;
  avatar: string;
  visible: boolean;
  vi: FeedbackLanguage;
  jp: FeedbackLanguage;
  createdAt: Date;
  updatedAt?: Date;
}

interface FeedbackLanguage {
  name: string;
  content: string;
}
