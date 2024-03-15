import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Artist, ArtistsService } from './artists.service';
import { ArtistPipe } from './artists.pipe';
import { CreateArtistrDto } from './dto/creare.artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createArtistDto: CreateArtistrDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe, ArtistPipe) user: Artist) {
    return user;
  }

  /*   @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserPassword(
    @Param('id', ParseUUIDPipe, UserPipe) user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.artistService.updateUserPassword(
      user.id,
      updatePasswordDto,
    );
  } */

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe, UserPipe) user: User) {
    return await this.artistService.delete(user.id);
  }
}
