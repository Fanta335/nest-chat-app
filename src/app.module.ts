import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat } from './cats/cat.entity';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'test',
          entities: [Cat],
          synchronize: true,
        };
      },
    }),
    CatsModule,
    // DB接続テストが成功したらwebsocket server接続をテストする
    // MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
