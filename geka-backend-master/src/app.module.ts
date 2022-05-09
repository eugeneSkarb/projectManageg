import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ResourcesModule } from './resources/resources.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Resource } from './resources/entities/resource.entity';
import { ResourceType } from './resources/entities/resourceType.entity';
import { Project } from './projects/entities/project.entity';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'project_manager',
      entities: [User, Task, Resource, ResourceType, Project],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    ResourcesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
