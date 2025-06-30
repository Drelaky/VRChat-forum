import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as databaseConfig from './config.json';
import { ForumAltCategoryModule } from './forum-alt-category/forum-alt-category.module';
import { ForumCategoryModule } from './forum-category/forum-category.module';
import { ForumPostModule } from './forum-post/forum-post.module';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';

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
