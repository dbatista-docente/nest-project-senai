import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/sendEmail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.prismaService.user
      .create({ data: createUserDto })
      .then((res) => {
        console.log('Usuário cadastrado');
        return res;
      })
      .catch((error) => {
        throw Error(`Error ao cadastrar usuário: ${error}`);
      });
  }

  async findAll() {
    const data: User[] = await this.prismaService.user.findMany();

    data.forEach((element) => {
      delete element.password;
    });

    return data;
  }

  async findOne(id?: string, email?: string) {
    try {
      // if (id) {
      //   const data: User = await this.prismaService.user.findUnique({
      //     where: { id },
      //   });
      //   delete data.password
      //   return data;
      // } else{
      //   const data: User = await this.prismaService.user.findUnique({
      //     where: { email },
      //   });
      //   return data;
      // }

      const data: User = await this.prismaService.user.findUnique({
        where: id ? { id } : { email }, // ternário tipo de if reduzido
      });
      id ? delete data.password : null;
      return data;

      // delete data.password; //comando para remover a senha do objeto
    } catch (error) {
      throw Error('Id de usuário não existente !');
    }
  }

  async update(id: string, updateAuthDto: UpdateUserDto) {
    try {
      const data: User = await this.prismaService.user.update({
        where: { id },
        data: updateAuthDto,
      });

      delete data.password; //comando para remover a senha do objeto

      return data;
    } catch (error) {
      return 'Id de usuário não existente !';
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      return 'Id de usuário não existente !';
    }
  }

  async createTokenRecoverPassword(email: string) {
    const data: User = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (data) {
      const user = await this.prismaService.user.update({
        where: { email },
        data: { token: Math.floor(Math.random() * 1000000) },
      });

      console.log(user.token);
      await this.emailService.sendEmailWithAttachment(
        'Token de recuperação Tefegraf Auto',
        String(user.token),
        data.email,
      );

      setTimeout(async () => {
        await this.prismaService.user.update({
          where: { email },
          data: { token: 0 },
        });
        console.log("mudei token para 0")
      }, 900000);
      return user.token;
    }
  }
}
