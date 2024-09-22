import { Field, ObjectType } from "type-graphql";
import Owner from "./owner.js";

@ObjectType()
export default class Repository {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  full_name!: string;

  @Field(() => Owner)
  owner!: Owner;
}

@ObjectType()
export class RepositoryInformation {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  full_name!: string;

  @Field(() => Owner)
  owner!: Owner;

  @Field(() => String)
  html_url!: string;

  @Field(() => String, { nullable: true })
  description!: string;
}