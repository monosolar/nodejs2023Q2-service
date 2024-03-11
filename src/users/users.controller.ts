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
} from '@nestjs/common';
import { CreateUserDto } from './dto/creare.user.dto';
import { UpdatePasswordDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { V4Options } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: V4Options) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: V4Options,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: V4Options) {
    return await this.userService.deleteUser(id);
  }
}
