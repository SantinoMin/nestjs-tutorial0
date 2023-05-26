import { IsInt, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly user_idx: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly username: string;
}
