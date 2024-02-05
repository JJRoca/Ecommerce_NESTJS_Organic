export interface ProductInterface {
  _id?: string;
  sku: string;
  name: string;
  short_name: string;
  price: number;
  description: string;
  imageUrl: string;
  __v?: number;
  category: {
    _id?: string;
    name: string;
    description?: string;
  };
  createdAt: Date;
}
