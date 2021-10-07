import { ConsoleLogger, Module } from '@nestjs/common';
import { DatabaseService } from '@app/console/database/database.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule],
  providers: [DatabaseService, ConsoleLogger],
})
export class DatabaseModule {}
