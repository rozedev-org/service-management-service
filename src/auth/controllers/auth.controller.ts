import {
  Controller,
  HttpCode,
  Inject,
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
import config from '@app/config';
import { ConfigType } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-authentication.guard';

interface RequestWithUser extends Request {
  user: UserEntity;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;

    const token = this.authService.generateToken(user.id);
    const expiresIn = new Date(
      Date.now() + Number(this.configService.jwtExpirationTime) * 1000
    );
    response
      .cookie('Authentication', token, {
        httpOnly: true,
        secure: this.configService.nodeEnv === 'production',
        sameSite: this.configService.nodeEnv === 'production' ? 'none' : 'lax',
        expires: expiresIn
      })
      .json({
        user,
        token,
        expiresIn
      });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('validate')
  async validate(@Req() req: Request) {
    const token = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith('Authentication'))
      .split('=')[1];

    return await this.authService.validateToken(token);
  }
}
