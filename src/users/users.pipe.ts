import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Injectable()
export class UserPipe implements PipeTransform<string, Promise<User>> {
  constructor(private readonly userService: UsersService) {}

  async transform(id: User['id']) {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException(`No entry with id ${id}`);
    }

    return user;
  }
}
