import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class loginInfo {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
