import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Category } from './Category';
import { ServicePriceOption } from './ServicePriceOption';

@Table
export class Service extends Model<Service> {
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @Column
  name: string;

  @Column
  type: string;

  @HasMany(() => ServicePriceOption)
  priceOptions: ServicePriceOption[];

  @BelongsTo(() => Category)
  category: Category;
}
