import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
