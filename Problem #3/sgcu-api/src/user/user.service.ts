import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/shared/constants';
import { find } from 'src/shared/utils';
import { NewUserDTO, UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  private userDB: UserDTO[] = [];
  constructor() {}

  create(newUser: NewUserDTO) {
    const user = new UserDTO();
    try {
      user.firstName = newUser.firstName;
      user.lastName = newUser.lastName;
      user.password = newUser.password;
      user.salary = newUser.salary;
      user.role = newUser.role;
      this.userDB.push(user);
    } catch {
      throw new BadRequestException();
    }
    return user;
  }

  findAll(firstName: String, lastName: String, role: Role) {
    return this.userDB.filter((user: UserDTO) => {
      let firstNameCheck = true;
      let lastNameCheck = true;
      let roleCheck = true;
      if (firstName) firstNameCheck = user.firstName === firstName;
      if (lastName) lastNameCheck = user.firstName === firstName;
      if (role) roleCheck = user.firstName === firstName;
      return firstNameCheck && lastNameCheck && roleCheck;
    });
  }

  async updateUserByUserId(userId: string, newUser: NewUserDTO) {
    const idx = await find(userId, this.userDB, (e) => e.id);
    if (idx === -1) throw new NotFoundException();
    const user = this.userDB[idx];
    try {
      user.firstName = newUser.firstName;
      user.lastName = newUser.lastName;
      user.password = newUser.password;
      user.role = newUser.role;
      user.salary = newUser.salary;
      this.userDB[idx] = user;
    } catch {
      throw new BadRequestException();
    }
    return user;
  }

  async deleteUserByUserId(userId: string) {
    const idx = await find(userId, this.userDB, (e) => e.id);
    if (idx === -1) throw new NotFoundException();
    return this.userDB.splice(idx, 1);
  }
}
