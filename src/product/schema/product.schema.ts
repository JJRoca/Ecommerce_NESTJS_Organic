import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  sku: string;

  @Prop({ unique: true, required: true, maxlength: 100 })
  name: string;

  @Prop()
  short_name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Category', required: true })
  category: Category;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
