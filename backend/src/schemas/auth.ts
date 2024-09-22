import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Auth {
  @Field(() => String)
  code!: string;
}