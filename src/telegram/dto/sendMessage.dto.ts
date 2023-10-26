import { ApiProperty } from '@nestjs/swagger';

export class sendMessageDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  chatid: number;

  @ApiProperty()
  tokenbot: string;

  @ApiProperty()
  images: string[]
}
