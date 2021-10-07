import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private configService: ConfigService
  ) {
    this.init()
  }

  async init() {
    const users = await this.findAll({})
    if (users.length === 0) {
      const admin: CreateUserDto = {
        name: this.configService.get<string>('APP_ADMIN_USER'),
        password: this.configService.get<string>('APP_ADMIN_PASSWORD'),
        role: 'admin',
        origin: 'local'
      }
      const adminUser = await this.create(admin)
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    if (createUserDto.origin === 'local') {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10)
    }

    Object.assign(user, createUserDto)

    const newUser = await this.usersRepository.save(user).catch(err => err)
    return newUser
  }

  async findAll(query: any): Promise<User[]> {
    return this.usersRepository.find({ where: query });
  }

  findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  findByName(name: string): Promise<User | undefined> {
    return this.usersRepository
      .createQueryBuilder("user")
      .select("user.id")
      .addSelect("user.ltiid")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.role")
      .addSelect("user.origin")
      .addSelect("user.isActive")
      .addSelect("user.password")
      .where("user.name = :name", { name })
      .getOne()
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    const toUpdate = await this.usersRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateUserDto)
    return this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createMoodleUser(mail: string, username: string): Promise<User> {
    const user = new User()
    user.name = username
    user.password = 'moodle'
    user.email = mail

    return await this.usersRepository.save(user);
  }

  async findMoodleUser(mail: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where:
        { email: mail }
    });
  }

}
