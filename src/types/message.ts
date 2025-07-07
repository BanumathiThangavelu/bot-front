export interface Message {
  _id: string;
  message: string;
  sender: 'USER' | 'BOT';
  createdAt?: string;
  supportId?: string;
}
