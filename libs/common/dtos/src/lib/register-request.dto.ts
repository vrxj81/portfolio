import { IUser } from '@portfolio/common-models';
import { IsString } from 'class-validator';
import { Match } from './custom/match-constraint';

export class RegisterRequestDto
  implements Pick<IUser, 'username' | 'email' | 'password'>
{
  @IsString()
  username!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword!: string;
}
