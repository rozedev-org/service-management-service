import { Module } from '@nestjs/common';
import { RequirementsService } from './services/requirements.service';
import { RequirementsController } from './controllers/requirements.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { UsersService } from '@app/users/services/users.service';

@Module({
  imports: [PrismaModule],
  providers: [RequirementsService, UsersService],
  controllers: [RequirementsController]
})
export class RequirementsModule {}
