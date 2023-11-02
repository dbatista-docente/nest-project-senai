import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsInt } from "class-validator"

export class SignInRecoverDto {
    @ApiProperty({example: "email@mail.com"})
    @IsEmail()
    email: string

    @ApiProperty({example: 123456})
    @IsInt()
    token: number
}