// src/entities/Product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  SKU: string;

  @Column()
  stockLevels: number;

  @Column({ nullable: true })
  position: number;

  @Column()
  IsPinned: boolean;
}
