import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {IUser} from '@suiteportal/api-interfaces'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() user: IUser) {
    return this.authService.verifyUserAndGenerateToken(user);
  }
}
