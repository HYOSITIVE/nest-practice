// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, Res, Header, Redirect, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Controller의 생성자에서 Service를 주입 받음. 객체 멤버 변수에 할당해 사용 가능

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;
    await this.usersService.createUser(name, email, password);
    console.log(createUserDto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }

  @Redirect('https://blog.hyositive.com', 301)
  @Get('/redirect/:id')
  Redirect(@Param('id') id: string) {
    if (id && id === '29') {
      return { url: 'https://blog.hyositive.com/29' };
    } else {
      return this.usersService.findOne(+id);
    }
  }

  @HttpCode(202) // Http Code 임의로 변경 가능 (Res 사용 시 적용 안됨)
  @Get()
  findAll(@Res() res) {
    // return this.usersService.findAll();
    const users = {
      name: 'Philip',
      age: 24,
    };
    return res.status(200).send(users); // @Res decorator 사용한 경우 res 임의로 설정 가능
  }

  @Header('Custom', 'Test Header')
  @Get('/header')
  findAllWithCustom(@Res() res) {
    return res.status(200).send('custom header test');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.'); // 자동으로 400 에러 반환
    } else return this.usersService.findOne(+id);
  }
}
