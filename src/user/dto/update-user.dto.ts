import { RegisterDto } from 'src/auth/dto/register.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(RegisterDto) {}

// Optional: interface for type safety
export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}
