import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResourceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
