import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findByName(name);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
    };
  }

  getRole(roles) {
    let result = 'student'
    roles.forEach(role => {
      if (role.includes('Instructor')) {
        result = 'teacher'
      }
    })
    return result
  }

  async ltilogin(token: any, body: any) {
    let user
    const role = this.getRole(token.platformContext.roles)
    let users = await this.usersService.findAll({ ltiid: Number(token.user) })
    if (users.length > 0) {
      user = users[0]
    }
    else {
      user = await this.usersService.create({
        name: `lti${Number(token.user)}`,
        origin: 'moodle',
        role,
        ltiid: Number(token.user)
      })
    }
    user.role = role
    user.name = token.userInfo.name
    user.ltik = body.ltik
    return this.login(user)
  }

}
