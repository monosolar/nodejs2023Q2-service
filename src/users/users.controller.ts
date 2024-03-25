import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/creare.user.dto';
import { UpdatePasswordDto } from './dto/update.user.dto';
import { User, UsersService } from './users.service';
import { UserPipe } from './users.pipe';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return user;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id', ParseUUIDPipe, UserPipe) user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updateUserPassword(
      user.id,
      updatePasswordDto,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return await this.userService.delete(user.id);
  }
}
