import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  chatid: number;

  @ApiProperty()
  tokenbot: string;

  @ApiProperty()
  images: string[] | undefined
}
