import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // attaches the returned object as property user to subsequent requests
    let roles: String[] = []
    switch (payload.user.role) {
      case 'student':
        roles = ['student']
        break;
      case 'teacher':
        roles = ['teacher', 'student']
        break;
      case 'admin':
        roles = ['admin', 'teacher', 'student']
        break;
    }
    return { id: payload.user.id, roles };
  }
}
