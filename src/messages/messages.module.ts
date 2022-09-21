import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesService, MessageGateway],
})
export class MessagesModule {}
