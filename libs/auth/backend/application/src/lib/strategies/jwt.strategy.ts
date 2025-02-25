import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectJwtConfig, JwtConfig } from '@portfolio/auth-backend-config';
import { IUser } from '@portfolio/common-models';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectJwtConfig() private readonly jwtConfig: JwtConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: { sub: string; user: IUser | null }) {
    return { userId: payload.sub, user: payload.user };
  }
}
