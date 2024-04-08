import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthenticationGuard } from '../guards/localAuthentication.guard';
import { Request, Response } from 'express';
import { UserEntity } from '@app/users/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;

    const token = this.authService.generateToken(user.id);

    response.json({
      user,
      token
    });
  }

  @HttpCode(200)
  @Post('validate')
  validate(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.authService.validateToken(token);
  }
}
