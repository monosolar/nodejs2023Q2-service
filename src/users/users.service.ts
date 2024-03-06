import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { V4Options, v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/creare.user.dto';
import { UpdatePasswordDto } from './dto/update.user.dto';
import { cloneObject, validateUuid } from 'src/utils';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
  /*
   */
}

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

type UserToReturn = Modify<
  User,
  {
    password: string;
  }
>;

@Injectable()
export class UsersService {
  private users: User[] = [];

  private getUserSecured(user: User): UserToReturn {
    const clonedUser = cloneObject(user);
    delete clonedUser?.password;

    return clonedUser as UserToReturn;
  }

  async getAllUsers(): Promise<UserToReturn[]> {
    return this.users.map((user) => this.getUserSecured(user));
  }

  async getUserById(id: V4Options): Promise<UserToReturn> {
    validateUuid(id);
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.getUserSecured(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserToReturn> {
    const { login, password } = createUserDto;
    if (!login || !password) {
      throw new HttpException(
        'Missing login or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return this.getUserSecured(newUser);
  }

  async updateUserPassword(
    id: V4Options,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserToReturn> {
    validateUuid(id);
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

  async deleteUser(id: V4Options): Promise<void> {
    validateUuid(id);
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users.splice(userIndex, 1);
  }
}
