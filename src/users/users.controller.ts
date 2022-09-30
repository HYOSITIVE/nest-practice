// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Res } from '@nestjs/common';
import { Header } from '@nestjs/common';
import { Redirect } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
