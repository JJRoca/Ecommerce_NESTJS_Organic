import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { CategoryDto } from './dto/category.dto';
import { SUCCESS_MESSAGES } from '../constant/constant';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  // Retrieve a category by id
  async getCategoryById(id: string): Promise<Category> {
    try {
      // if category is found, return the category
      return await this.categoryModel.findById(id);
    } catch (error) {
      // throw an error if category is not found
      throw new ConflictException('Category not found');
    }
  }
  // Retrieve a category by name
  async getCategoryByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ name });
  }
  // Create a new category
  // eslint-disable-next-line prettier/prettier
  async create({ name, description }: CategoryDto): Promise<{data: Category; message:string}> {
    const existingCategory = await this.getCategoryByName(name);
    // check if category already exists
    if (existingCategory) {
      // throw an conflict exception if category already exists
      throw new ConflictException(`Category with name ${name} already exists`);
    }
    // Create and return the new category
    const category = await this.categoryModel.create({ name, description });
    return {
      message: SUCCESS_MESSAGES.CATEGORY_CREATED,
      data: category,
    };
  }

  async findCategoryAll(): Promise<{ data: Category[]; meta: any }> {
    const categoriesList = await this.categoryModel.find();
    const meta = categoriesList.length;
    return { data: categoriesList, meta };
  }
}
