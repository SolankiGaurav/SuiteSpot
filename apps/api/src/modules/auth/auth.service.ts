import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {IUser} from '@suiteportal/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../models/User.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async verifyUserAndGenerateToken(user: IUser) {
    const userFromDb = await this.userModel.findOne({
      username: user.username,
    });
    if (!userFromDb) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isValidUser = await bcrypt.compare(
      user.password,
      userFromDb.password
    );

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync(
      { username: userFromDb.username },
      { secret: environment.JWT_SECRET, expiresIn: environment.JWT_EXPIRES_IN }
    );
    return {
      token: token,
    };
  }
}
