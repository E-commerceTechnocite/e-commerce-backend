import { ConsoleLogger, Module } from '@nestjs/common';
import { ApplicationConfigurationModule } from '@app/configuration/application-configuration.module';
import { ConsoleModule } from 'nestjs-console';
import { ReleaseConsoleService } from '@app/release-console/release-console.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@app/user/entities/role.entity';
import { User } from '@app/user/entities/user.entity';
import { SharedModule } from '@app/shared/shared.module';
import { MailModule } from '@app/mail/mail.module';

@Module({
  imports: [
    ApplicationConfigurationModule,
    TypeOrmModule.forFeature([User, Role]),
    ConsoleModule,
    SharedModule,
    MailModule,
  ],
  providers: [ReleaseConsoleService, ConsoleLogger],
})
export class ReleaseConsoleModule {}
