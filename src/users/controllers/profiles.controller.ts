import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { ProfilesService } from '../services/profiles.service';
import {
  CreateProfileDto,
  GetProfileDto,
  UpdateProfileDto
} from '../dtos/profile.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { ProfileEntity } from '../entities/profile.entity';
import { PageDto } from '@common/dtos/page.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';

@ApiTags('Profiles')
@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}
  @Get(':id')
  @ApiOkResponse({ type: ProfileEntity })
  getProfile(@Param() params: FindByIdDto): Promise<Profile> {
    return this.profileService.profile(params);
  }

  @Get()
  @ApiPaginatedResponse(ProfileEntity)
  async getProfiles(
    @Query() queryParams: GetProfileDto
  ): Promise<PageDto<Profile>> {
    return this.profileService.profiles(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: ProfileEntity })
  async createProfile(@Body() payload: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: ProfileEntity })
  update(@Param() params: FindByIdDto, @Body() payload: ProfileEntity) {
    return this.profileService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProfileEntity })
  remove(@Param() params: FindByIdDto) {
    return this.profileService.remove(params);
  }
}
