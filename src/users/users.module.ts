import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controllers';

import { PrismaModule } from 'src/database/prisma.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
