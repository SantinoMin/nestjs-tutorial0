import { IsInt, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  createQueryBuilder() {
    throw new Error('Method not implemented.');
  }
  @IsInt()
  readonly user_idx: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
