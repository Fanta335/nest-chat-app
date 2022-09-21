import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat } from './cats/cat.entity';
import { CatsModule } from './cats/cats.module';
import { getSecretsValuesFromAwsSecretManager } from './configurations';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { username, password, engine, host, port, dbname } =
          await getSecretsValuesFromAwsSecretManager();
        return {
          type: engine,
          host: host,
          port: port,
          username: username,
          password: password,
          database: dbname,
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
