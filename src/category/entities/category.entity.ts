import { ProductEntity } from 'product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 127 })
  category: string;

  @ManyToMany(() => ProductEntity, (category) => category.categories)
  products: ProductEntity;
}
