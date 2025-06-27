import { HttpException, HttpStatus } from '@nestjs/common';

export class LinkNotExistsException extends HttpException {
  constructor() {
    super('Link not exists', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
