import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';

import { PrismaModule } from 'src/database/prisma.module';
import { UsersService } from './services/users.service';
import { ProfilesController } from './controllers/profiles.controller';
import { ProfilesService } from './services/profiles.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService, ProfilesService]
})
export class UsersModule {}
