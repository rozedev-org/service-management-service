import { Module } from '@nestjs/common';
import { RequirementsService } from './services/requirements.service';
import { RequirementsController } from './controllers/requirements.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { UsersService } from '@app/users/services/users.service';
import { ReqStateController } from './controllers/state/req-state.controller';
import { ReqStateService } from './services/req-state/req-state.service';
import { ReqTypeService } from './services/req-type/req-type.service';
import { ReqTypeFieldService } from './services/req-type/req-type-field.service';
import { ReqTypeController } from './controllers/type/req-type.controller';
import { ProfilesService } from '@app/users/services/profiles.service';

@Module({
  imports: [PrismaModule],
  providers: [
    RequirementsService,
    UsersService,
    ProfilesService,
    ReqStateService,
    ReqTypeService,
    ReqTypeFieldService
  ],
  controllers: [ReqTypeController, ReqStateController, RequirementsController]
})
export class RequirementsModule {}
