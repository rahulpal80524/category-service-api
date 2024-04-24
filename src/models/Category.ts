import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Service } from './Service';

@Table
export class Category extends Model<Category> {
  @Column
  name: string;

  @HasMany(() => Service)
  services: Service[];
}
