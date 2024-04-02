import { Module } from '@nestjs/common';
import { RequirementsService } from './services/requirements.service';
import { RequirementsController } from './controllers/requirements.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { UsersService } from '@app/users/services/users.service';
import { ReqStateController } from './controllers/req-state.controller';
import { ReqStateService } from './services/req-state.service';

@Module({
  imports: [PrismaModule],
  providers: [RequirementsService, UsersService, ReqStateService],
  controllers: [RequirementsController, ReqStateController]
})
export class RequirementsModule {}
