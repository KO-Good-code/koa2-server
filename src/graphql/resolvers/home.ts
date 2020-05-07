import { Resolver, Query, Mutation, Args } from 'type-graphql'
import { Student } from '../schema'

@Resolver(Student)
export class homeResolver {
  @Query( returns  => Student)
  async home() {
    return {
      _id: '1234'
    }
  }
}