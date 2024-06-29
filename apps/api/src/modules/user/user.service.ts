import { Injectable } from '@nestjs/common';
import {IUser} from '@suiteportal/api-interfaces'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../models/User.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: IUser) {
    user.password = await bcrypt.hash(user.password, 12);
    console.log(user);
    await this.userModel.create(user);
    return {
      success: true,
    };
  }
}
