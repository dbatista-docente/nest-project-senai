import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { sendMessageDto } from './dto/sendMessage.dto';

@ApiTags('Telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('send')
  @ApiOperation({ summary: 'enviar mensagem telegram' })
  async sendMessage(@Body() dtoMessage: sendMessageDto) {
    await this.telegramService.sendTelegrafText(dtoMessage);
  }

  @Post('send-media')
  @ApiOperation({ summary: 'enviar mensagem telegram com imagem' })
  async sendMessageMedia(@Body() dtoMessage: sendMessageDto) {
    await this.telegramService.sendTelegrafMedia(dtoMessage)
  }
}
