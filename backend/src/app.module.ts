import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProd = process.env.NODE_ENV === 'production';

        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: !isProd,

          ...(isProd
            ? {
                url: configService.get<string>('DB_URL'),
                ssl: {
                  rejectUnauthorized: false,
                },
              }
            : {
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get('DB_PORT', '5432')),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
              }),
        };
      },
    }),
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
