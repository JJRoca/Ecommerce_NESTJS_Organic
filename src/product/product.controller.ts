import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ProductInterface } from './interface/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProductAll() {
    return this.productService.getProductAll();
  }

  @Post('createProduct')
  createProduct(@Body() productoDto: ProductDto) {
    return this.productService.createProduct(productoDto);
  }

  @Put('updateProduct/:id')
  updateProduct(@Param('id') id: string, @Body() product: ProductInterface) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
