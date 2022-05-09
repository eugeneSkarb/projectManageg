import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Industry } from './industry.entity';
import { EnterpriseIndicators } from './enterpriseIndicators.entity';

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  inn: string;

  @Column({ nullable: false })
  ogrn: string;

  @ManyToOne(() => Industry, (industry) => industry.enterprises)
  industry: Industry;

  @OneToMany(() => EnterpriseIndicators, (indicators) => indicators.enterprise)
  indicators: EnterpriseIndicators[];
}
