import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class UserInformation {
  @Field(() => String)
  login!: string;

  @Field(() => String)
  avatar_url!: string;

  @Field(() => String)
  html_url!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  bio!: string;

  @Field(() => String)
  public_repos!: string;

  @Field(() => String)
  github_created_at!: string;

  @Field(() => String)
  github_updated_at!: string;
}