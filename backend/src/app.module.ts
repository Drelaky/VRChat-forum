import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from './config.json';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ForumCategoryModule } from './forum-category/forum-category.module';
import { ForumAltCategoryModule } from './forum-alt-category/forum-alt-category.module';
import { ForumPostModule } from './forum-post/forum-post.module';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [],
      autoLoadEntities: true,
      synchronize: databaseConfig.synchronize,
    }),
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'permission',
            module: PermissionModule,
          },
          {
            path: 'roles',
            module: RolesModule,
          },
          {
            path: 'forum-main-category',
            module: ForumCategoryModule,
          },
          {
            path: 'forum-sub-category',
            module: ForumAltCategoryModule,
          },
        ],
      },
    ]),
    AuthModule,
    UserModule,
    ForumCategoryModule,
    ForumAltCategoryModule,
    ForumPostModule,
    RolesModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
