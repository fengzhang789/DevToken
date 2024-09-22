import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Owner {
  @Field(() => String)
  login!: string;

  @Field(() => String)
  avatar_url!: string;
}
