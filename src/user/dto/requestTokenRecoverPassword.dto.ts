import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class requestTokenRecoverPasswordDto {
    @ApiProperty({example: "email@mail.com"})
    @IsEmail()
    email: string
}