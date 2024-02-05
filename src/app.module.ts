import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://roca:mo3HJFShzMntb5F0@cluster0.5pagdww.mongodb.net/fruitable',
    ),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
