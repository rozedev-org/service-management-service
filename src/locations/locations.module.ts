import { Module } from '@nestjs/common';
import { StatesController } from './controller/states/states.controller';
import { CitiesController } from './controller/cities/cities.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { StatesService } from './services/states/states.service';
import { CitiesService } from './services/cities/cities.service';
import { TownsService } from './services/towns/towns.service';
import { TownsController } from './controller/towns/parroquias.controller';
import { OfficesController } from './controller/offices/offices.controller';
import { OfficesService } from './services/offices/offices.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    StatesController,
    CitiesController,
    TownsController,
    OfficesController
  ],
  providers: [StatesService, CitiesService, TownsService, OfficesService]
})
export class LocationsModule {}
