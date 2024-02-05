import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "../dto/create-task.dto";

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.taskService.createTask(dto);
  }

  @Get()
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Get('/:id')
  async getTaskByID(@Param('id') id: number) {
    return await this.taskService.getTaskByID(id);
  }

  @Put('/:id')
  async updateTask(@Param('id') id: number,
                   @Body() dto: CreateTaskDto) {
    return await this.taskService.updateTask(id, dto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskService.deleteTask(id);
  }

  @Put('/:id')
  async makeTaskDone(@Param('id') id: number) {
    return await this.taskService.makeTaskDone(id);
  }
}