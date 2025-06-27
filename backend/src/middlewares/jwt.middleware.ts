import { AuthService } from '@app/auth/auth.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.headers['Key'];
    const tokenType = <string>req.headers['Key2'];

    if (!token) {
      return next();
    }

    try {
      const user = await this.authService.getUser(token, tokenType);
      if (!user) throw new UnauthorizedException('Invalid token');

      req['user'] = user;
    } catch (err) {
      console.warn('JWT middleware error:', err.message);
    }

    next();
  }
}
