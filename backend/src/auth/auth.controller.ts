import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('discordAuth')
  findAll(@Body() body) {
    return this.authService.findAll(body.code);
  }

  @Post('getUser')
  async findUser(@Body() body) {
    return await this.authService.getUser(body.access_token, body.token_type);
  }
}
