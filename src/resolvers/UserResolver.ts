import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import { UserModel, IUser } from "../models/User";

@ObjectType()
class User {
  @Field()
  _id!: string;

  @Field()
  name!: string;

  @Field()
  email!: string;
}

@InputType()
class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<IUser[]> {
    return await UserModel.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<IUser> {
    return await UserModel.create(data);
  }
}
