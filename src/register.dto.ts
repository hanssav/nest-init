import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
