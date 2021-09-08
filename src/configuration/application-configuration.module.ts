import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DATABASE_HOST'],
      port: +process.env['DATABASE_PORT'],
      username: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
  exports: [ConfigModule, TypeOrmModule],
})
export class ApplicationConfigurationModule {}
