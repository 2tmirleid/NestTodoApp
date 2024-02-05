import { Module } from '@nestjs/common';
import * as process from 'process';
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tasks } from "./models/task.model";
import { TaskModule } from "./tasks/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Tasks],
      synchronize: true,
      autoLoadModels: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
