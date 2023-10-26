import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({example: "Olá estou funcionando."})
  message: string;

  @ApiProperty({example: -1002033466946})
  chatid: number;

  @ApiProperty({example: "6827435531:AAHgj-zB8zEenaJRUnrhRU0PBmmnxZUeQDU"})
  tokenbot: string;

  @ApiProperty({example: []})
  images: string[] | undefined

  @ApiProperty({example: "2023-10-26T20:31:00"})
  schedule: string | Date
}
