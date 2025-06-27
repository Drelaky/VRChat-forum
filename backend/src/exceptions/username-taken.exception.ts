import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameTakenException extends HttpException {
  constructor() {
    super('Username already taken!', HttpStatus.CONFLICT);
  }
}
