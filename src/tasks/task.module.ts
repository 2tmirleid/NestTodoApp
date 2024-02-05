import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Tasks } from "../models/task.model";

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    SequelizeModule.forFeature([Tasks])
  ],
  exports: [
    TaskService
  ]
})
export class TaskModule {}