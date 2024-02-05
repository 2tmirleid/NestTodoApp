import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Tasks } from "../models/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Tasks) private taskRepository: typeof Tasks) {}

  async createTask(dto: CreateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: {
        title: dto.title
      }
    })
    if (task) {
      throw new HttpException('Task already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.taskRepository.create({ ...dto });
  }

  async getTasks() {
    return await this.taskRepository.findAll();
  }

  async getTaskByID(taskID: number) {
    return await this.taskRepository.findOne({
      where: { id: taskID }
    });
  }

  async updateTask(taskID: number, dto: CreateTaskDto) {
    const task = await this.getTaskByID(taskID);
    if (!task) {
      throw new HttpException("Can't find a task", HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.update({
      title: dto.title,
      description: dto.description,
    }, {
      where: {
        id: taskID
      }
    });
  }

  async deleteTask(taskID) {
    const task = await this.getTaskByID(taskID);
    if (!task) {
      throw new HttpException("Can't find a task", HttpStatus.NOT_FOUND);
    }

    return await this.taskRepository.destroy({
      where: {
        id: taskID
      },
    });
  }

  async makeTaskDone(taskID) {
    const task = await this.getTaskByID(taskID);
    if (!task) {
      throw new HttpException("Can't find a task", HttpStatus.NOT_FOUND);
    }

    const isDone = task.isDone;

    return await this.taskRepository.update({
      isDone: !isDone
    }, {
      where: {
        id: taskID
      }
    })
  }
}