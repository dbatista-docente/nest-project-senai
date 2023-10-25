import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { sendMessageDto } from './dto/sendMessage.dto';
import { MediaGroup } from 'telegraf/typings/telegram-types';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private chatId: string;
  // constructor() {
  //   // Substitua 'YOUR_BOT_TOKEN' pelo token do seu bot do Telegram
  //   this.bot = new Telegraf('6827435531:AAHgj-zB8zEenaJRUnrhRU0PBmmnxZUeQDU');
  //   this.chatId = '-1002033466946';
  // }
  base64ToImage(base64: string): Buffer {
    const base64Data = base64.replace(/^data:image\/jpeg;base64,/, '');

    return Buffer.from(base64Data);
  }

  async sendTelegrafText({ message, chatid, tokenbot }: sendMessageDto) {
    try {
      const bot = new Telegraf(tokenbot);
      await bot.telegram.sendMessage(chatid, message);
      console.log('Mensagem enviada');
    } catch (error) {
      console.log('sendTelegrafText: ', error);
    }
  }

  async sendTelegrafMedia(
    message: string,
    chatid: string,
    tokenbot: string,
    images: string[],
  ) {
    const bot = new Telegraf(tokenbot);
    const media: MediaGroup = images.map((image) => ({
      type: 'photo',
      media: { source: this.base64ToImage(image) },
      caption: '',
    }));

    media[media.length - 1].caption = message;

    await bot.telegram.sendMediaGroup(chatid, media);
    console.log('Mensagem enviada')
  }
}
