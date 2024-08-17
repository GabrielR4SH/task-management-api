import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {}
