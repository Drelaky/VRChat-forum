import { HttpException, HttpStatus } from '@nestjs/common';

export class UnableToSendEmailException extends HttpException {
  constructor() {
    super(
      'Email could not send to address! Please check the entered email address once again.',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
