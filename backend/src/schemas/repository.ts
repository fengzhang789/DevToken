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

@ObjectType()
export class RepositoryContributorInformation {
  @Field(() => Number)
  total!: number;

  @Field(() => String)
  login!: string;

  @Field(() => String)
  avatar_url!: string

  @Field(() => String)
  html_url!: string
}