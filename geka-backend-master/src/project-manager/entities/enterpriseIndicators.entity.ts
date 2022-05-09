import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Enterprise } from './enterprise.entity';

@Entity()
export class EnterpriseIndicators {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.indicators)
  enterprise: Enterprise;

  @Column({ type: 'smallint', nullable: false })
  year: number;

  // Собственный капитал
  @Column('int')
  equity: number;

  // Заёмный капитал
  @Column('int')
  borrowedCapital: number;

  // Оборотные активы
  @Column('int')
  currentAssets: number;

  // Внеоборотные активы
  @Column('int')
  nonCurrentAssets: number;

  // Краткосрочные обязательства
  @Column('int')
  shortTermObligations: number;

  // Денежные средства
  @Column('int')
  cash: number;

  // Краткосрочные финансовые вложения
  @Column('int')
  shortTermDeposit: number;

  // Валовая прибыль
  @Column('int')
  grossIncome: number;

  // Коммерческие расходы
  @Column('int')
  commercialExpenses: number;

  // Управленческие расходы
  @Column('int')
  administrativeExpenses: number;

  // Выручка от продаж
  @Column('int')
  revenue: number;
}
