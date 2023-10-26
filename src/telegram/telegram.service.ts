import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SendMessageDto } from './dto/sendMessage.dto';
import { MediaGroup } from 'telegraf/typings/telegram-types';

@Injectable()
export class TelegramService {
  //   token: 6827435531:AAHgj-zB8zEenaJRUnrhRU0PBmmnxZUeQDU
  //   chatId: -1002033466946

  private base64ToImage(base64: string): Buffer {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, '');

    return Buffer.from(base64Data, 'base64');
  }

  private async sendTelegrafText({
    message,
    chatid,
    tokenbot,
  }: SendMessageDto) {
    try {
      const bot = new Telegraf(tokenbot);
      await bot.telegram.sendMessage(chatid, message);
      console.log('Mensagem enviada');
    } catch (error) {
      console.log('sendTelegrafText: ', error);
    }
  }

  private async sendTelegrafMedia({
    message,
    chatid,
    tokenbot,
    images,
  }: SendMessageDto) {
    const bot = new Telegraf(tokenbot);
    const media: MediaGroup = images.map((image) => ({
      type: 'photo',
      media: { source: this.base64ToImage(image) },
      caption: '',
    }));

    media[media.length - 1].caption = message;
    console.log(media);

    await bot.telegram.sendMediaGroup(chatid, media);
    console.log('Mensagem enviada');
  }

  async sendMessageSwitch(sendMessageDto: SendMessageDto) {
    sendMessageDto.images
      ? this.sendTelegrafMedia(sendMessageDto)
      : this.sendTelegrafText(sendMessageDto);
  }
}
