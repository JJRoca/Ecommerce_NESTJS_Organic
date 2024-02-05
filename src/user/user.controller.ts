import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: any) {
    return this.userService.create(user);
  }
}
