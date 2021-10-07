import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { AssignmenttasksModule } from './assignmenttasks/assignmenttasks.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { DomainsModule } from './domains/domains.module';
import { RatingsModule } from './ratings/ratings.module';
import { LtiMiddleware } from './lti/lti.middleware'
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { LtiModule } from './lti/lti.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    LtiModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        let host = configService.get<string>('POSTGRES_HOST')
        if (configService.get<string>('POSTGRES_ON_LOCALHOST') === 'true') {
          host = 'localhost'
        }
        return {
          type: 'postgres',
          host,
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get<string>('NEST_DB_USER'),
          password: configService.get<string>('NEST_DB_PASSWORD'),
          database: configService.get<string>('NEST_DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/doatask',
      exclude: ['/doatask/api*']
    }),
    UsersModule,
    TasksModule,
    AssignmentsModule,
    AuthModule,
    AssignmenttasksModule,
    SubmissionsModule,
    DomainsModule,
    RatingsModule,
    CommentsModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LtiMiddleware)
      .forRoutes('lti');
  }
}
