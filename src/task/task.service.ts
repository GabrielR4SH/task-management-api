import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const ftask = this.tasks.filter((t) => t.id === id);
    if (ftask.length) {
      return ftask[0];
    }
    //throw new NotFoundException(`Tasks With id ${id}`);
    throw new HttpException(`Tasks With id: ${id}`, HttpStatus.NOT_FOUND);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title !== undefined && t.title !== params.title) {
        match = false;
      }

      if (params.status !== undefined && t.status !== params.status) {
        match = false;
      }

      return match;
    });
  }

  update(task: TaskDto) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index >= 0) {
      this.tasks[index] = task;
      return;
    }
    throw new HttpException(
      `Tasks With id: ${task.id}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new HttpException(
      `Tasks with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
