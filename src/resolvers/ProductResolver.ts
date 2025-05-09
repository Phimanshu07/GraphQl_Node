import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import { ProductModel, IProduct } from "../models/Product";

@ObjectType()
class Product {
  @Field()
  _id!: string;

  @Field()
  title!: string;

  @Field()
  price!: number;
}

@InputType()
class CreateProductInput {
  @Field()
  title!: string;

  @Field()
  price!: number;
}

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<IProduct[]> {
    return await ProductModel.find();
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("data") data: CreateProductInput
  ): Promise<IProduct> {
    return await ProductModel.create(data);
  }
}
