import { CustomException } from '@app/exceptions/custom.exception';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import * as config from '../config.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authDB: Repository<Auth>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(code: any): Promise<any> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': '*',
    };

    const data = new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: `http://localhost/redirection`,
      scope: 'identify',
    });

    return await lastValueFrom(
      this.httpService
        .post('https://discord.com/api/oauth2/token', data, {
          headers: headers,
        })
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new CustomException('error', error.status);
          }),
        ),
    );
  }

  async getUser(access_token: string, token_type: string) {
    return await lastValueFrom(
      this.httpService
        .get('https://discord.com/api/users/@me', {
          headers: {
            'Accept-Encoding': '*',
            authorization: `${token_type} ${access_token}`,
          },
        })
        .pipe(
          map(async (res) => {
            let data = res.data;
            if (!data.avatar) {
              this.authDB.save({
                username: data.global_name,
                discordID: data.id,
                img: null,
                theme: 'dark',
              });
            }

            const foundUser = await this.authDB.findOne({
              where: {
                discordID: data.id,
                username: data.global_name,
              },
            });

            if (foundUser) {
              await this.authDB.update(foundUser.id, {
                username: data.global_name,
                img: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp?size=80`,
              });
            } else {
              await this.authDB.save({
                username: data.global_name,
                discordID: data.id,
                img: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp?size=80`,
                theme: 'dark',
              });
            }

            const fullUser = await this.authDB.findOne({
              where: { username: data.global_name, discordID: data.id },
              relations: ['role'],
            });
            return fullUser;
          }),
          catchError((error) => {
            console.log(error);

            throw new CustomException('Hiba történt', error.response.status);
          }),
        ),
    );
  }
}
