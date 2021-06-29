import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { NewUserDTO, UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ description: 'Created user object', type: NewUserDTO })
  @ApiCreatedResponse({
    description: 'Create user complete',
    type: UserDTO,
  })
  @ApiBadRequestResponse({ description: 'Client send wrong data' })
  async createUser(@Body() newUser: NewUserDTO) {
    return await this.userService.create(newUser);
  }

  @Get()
  @ApiQuery({
    description: 'Get all user with first name',
    name: 'firstName',
    type: String,
    required: false,
  })
  @ApiQuery({
    description: 'Get all user with last name',
    name: 'lastName',
    type: String,
    required: false,
  })
  @ApiQuery({
    description: 'Get all user with role',
    name: 'role',
    type: String,
    required: false,
  })
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Array of all user',
    type: UserDTO,
    isArray: true,
  })
  getAllUser(
    @Query('firstName') firstName,
    @Query('lastName') lastName,
    @Query('role') role,
  ) {
    return this.userService.findAll(firstName, lastName, role);
  }

  @Put('/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id that need to be updated',
  })
  @ApiBody({ description: 'Updated user object', type: NewUserDTO })
  @ApiOperation({ summary: 'Update user by userId' })
  @ApiOkResponse({ description: 'Update user complete', type: UserDTO })
  @ApiNotFoundResponse({ description: 'This user id not found' })
  @ApiBadRequestResponse({ description: 'Client send wrong data' })
  async updateUserById(
    @Param('userId') userId: string,
    @Body() newUser: NewUserDTO,
  ) {
    return await this.userService.updateUserByUserId(userId, newUser);
  }

  @Delete('/:userId')
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'user id that need to be deleted',
  })
  @ApiOperation({ summary: 'Delete user by userId' })
  @ApiOkResponse({ description: 'Delete user complete', type: UserDTO })
  @ApiNotFoundResponse({ description: 'This user id not found' })
  async deleteUserById(@Param('userId') userId: string) {
    return await this.userService.deleteUserByUserId(userId);
  }
}
