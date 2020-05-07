import "reflect-metadata";
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Student {
    @Field()
    public _id?: string;
}
