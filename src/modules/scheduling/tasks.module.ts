import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { EventsModule } from '../events/events.module';

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), EventsModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksGlobalModule {}
