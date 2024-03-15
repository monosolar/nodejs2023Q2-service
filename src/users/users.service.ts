import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/creare.user.dto';
import { UpdatePasswordDto } from './dto/update.user.dto';
import { cloneObject } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

export interface User {
  id: string;
  login: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user: User = new UsersEntity();
    user.login = createUserDto.login;
    user.password = createUserDto.password;

    return await this.usersRepository.save(user);
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async getById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.usersRepository.delete({ id });
  }

  async updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.getById(id);

    if (user.password !== oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }

    await this.usersRepository.update(user.id, { password: newPassword });

    return await this.getById(user.id);
  }

  /*
  async updateUserPassword(
    id: V4Options,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserToReturn> {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!oldPassword || !newPassword) {
      throw new HttpException('Incomplete data', HttpStatus.BAD_REQUEST);
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (this.users[userIndex].password !== oldPassword) {
      throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
    }
    this.users[userIndex].password = newPassword;
    this.users[userIndex].updatedAt = Date.now();
    this.users[userIndex].version++;

    return this.getUserSecured(this.users[userIndex]);
  }
  */
}
