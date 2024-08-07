import { Module } from '@nestjs/common';
import { StatesController } from './controller/states/states.controller';
import { CitiesController } from './controller/cities/cities.controller';
import { ParroquiasController } from './controller/parroquias/parroquias.controller';
import { LocationsController } from './controller/locations.controller';
import { PrismaModule } from '@app/database/prisma.module';
import { LocationsService } from './services/locations.service';
import { StatesService } from './services/states/states.service';
import { CitiesService } from './services/cities/cities.service';
import { ParroquiasService } from './services/parroquias/parroquias.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    StatesController,
    CitiesController,
    ParroquiasController,
    LocationsController
  ],
  providers: [LocationsService, StatesService, CitiesService, ParroquiasService]
})
export class LocationsModule {}
