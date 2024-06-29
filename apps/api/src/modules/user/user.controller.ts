import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {IUser} from '@suiteportal/api-interfaces'
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private userService:UserService) {}


  @Post('/register')
  @HttpCode(201)
  registerUser(@Body() user:IUser){
    return this.userService.createUser(user);
  }

}
