import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ResourceType } from './resourceType.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @OneToOne(() => ResourceType, (resourceType) => resourceType.id)
  type: ResourceType;
}
