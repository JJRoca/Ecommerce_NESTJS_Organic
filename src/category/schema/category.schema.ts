import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category {
  @Prop({
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    trim: true,
  })
  name: string;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
