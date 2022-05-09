import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany, ManyToMany, JoinTable
} from "typeorm";
import { Project } from '../../projects/entities/project.entity';
import { Resource } from "../../resources/entities/resource.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date')
  startDate: string;

  @Column('date')
  deadline: string;

  @Column()
  duration: number;

  @ManyToOne(() => Project, (project) => project.id)
  project: number;

  @ManyToOne(() => Task, (task) => task.childTasks)
  parentTask: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  childTasks: Task[];

  @ManyToMany(() => Resource)
  @JoinTable()
  resources: Resource[]
}
