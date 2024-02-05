import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { ProductDto } from './dto/product.dto';
import { SUCCESS_MESSAGES } from 'src/constant/constant';
import { CategoryService } from 'src/category/category.service';
import { ProductInterface } from './interface/product.interface';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private categoryService: CategoryService,
  ) {}
  // eslint-disable-next-line prettier/prettier
  async getProductAll(): Promise<{data: Product[], result: any}> {
    const product = await this.productModel.find().populate('category');
    return {
      result: `Total products: ${product.length}`,
      data: product,
    };
  }

  // eslint-disable-next-line prettier/prettier
  async createProduct(productDto: ProductDto): Promise<{ data: ProductInterface, message: string, result: boolean }> {
    // call the getCategoryById method from the category service
    // eslint-disable-next-line prettier/prettier
    const category= await this.categoryService.getCategoryById(productDto.category);

    // check if product already exists
    const existingProduct = await this.productModel.findOne({
      name: productDto.name,
    });
    // if product alreadt exists, then throw a conflict exception
    if (existingProduct) {
      throw new ConflictException('Product already exists');
    }
    // Create and return the new product
    const product = await this.productModel.create(productDto);
    // return the new product with the category details
    return {
      message: SUCCESS_MESSAGES.PRODUCT_CREATED,
      result: true,
      data: {
        _id: product._id.toString(),
        sku: product.sku,
        name: product.name,
        short_name: product.short_name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        __v: product.__v,
        createdAt: product.createdAt,
        category: category,
      },
    };
  }

  async updateProduct(id: string, product: ProductInterface) {
    return this.productModel.findByIdAndUpdate(id, product);
  }

  // delete product by id
  async deleteProduct(id: string) {
    try {
      // check if product exists
      const product = await this.productModel.findByIdAndDelete(id);
      // if product does not exist, return null
      if (!product) {
        return {
          message: null,
          result: false,
        };
      }
      // if product exists, return success message
      return {
        message: SUCCESS_MESSAGES.PRODUCT_DELETE,
        result: true,
      };
    } catch (error) {
      // handle error
      throw new InternalServerErrorException(
        'An error occurred while deleting the product',
      );
    }
  }
}
