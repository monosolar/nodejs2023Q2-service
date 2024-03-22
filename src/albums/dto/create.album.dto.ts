import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  artistId: string | null;
}
