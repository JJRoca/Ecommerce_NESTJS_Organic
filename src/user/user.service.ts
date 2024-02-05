import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserInterface>,
  ) {}
  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }
}
