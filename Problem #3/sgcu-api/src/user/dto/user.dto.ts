import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/constants';
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 8);

export class UserBase {
  @ApiProperty({ description: 'first name of user' })
  firstName: string;
  @ApiProperty({ description: 'last name of user' })
  lastName: string;
  @ApiProperty({ description: 'salary of user' })
  salary: string;
  @ApiProperty({ description: 'role of user', enum: Role })
  role: Role;
  @ApiProperty({ description: 'password of user' })
  password: string;
}

export class UserDTO extends UserBase {
  constructor() {
    super();
    this.id = nanoid();
  }
  @ApiProperty({ description: 'id of user' })
  id: string;
}

export class NewUserDTO extends UserBase {}
