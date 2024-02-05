import { Document } from 'mongoose';
export interface UserInterface extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}
