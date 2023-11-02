import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/email/sendEmail.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class UserModule {}
