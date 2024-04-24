import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Service } from './Service';

@Table
export class ServicePriceOption extends Model<ServicePriceOption> {
  @ForeignKey(() => Service)
  @Column
  serviceId: number;

  @Column
  duration: string;

  @Column
  price: number;

  @Column
  type: string;

  @BelongsTo(() => Service)
  service: Service;
}
