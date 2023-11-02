import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsInt, IsOptional, IsString, Matches, MinLength, isEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Paulo Caetano' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '@123Abcd' })
  @IsString()
  @MinLength(8, { message: 'Senha deve conter 8 digitos' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  password: string;

  @ApiProperty({ example: 'https://tm.ibxk.com.br/2017/06/22/22100428046161.jpg' })
  @IsString()
  picture: string;

  @ApiProperty({ example: 245893 })
  @IsOptional()
  @IsInt()
  token?: number
}
