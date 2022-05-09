import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Enterprise } from './enterprise.entity';

@Entity()
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Enterprise, (enterprise) => enterprise.industry)
  enterprises: Enterprise[];
}
