import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from 'graphql-iso-date'
import db from "../modules/db";
import { enqueue, queue } from "../modules/queue";
import { times } from "lodash";

const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    entries: () => {
      return db.formEntry.findMany({ orderBy: { publishedAt: 'desc' } })
    },
  },

  Mutation: {
    queueEntryGeneration: async (_: any, { count }: { count: number }) => {

      // map() method will return an array of promises (length based on "count" argument)
      // Then, we handle each promise with "Promise.all()"
      await Promise.all(times(count ?? 1).map(async () => {
        await enqueue('generateEntries');
      }))
      return true;
    },
    deleteFormData: async () => {
      await enqueue('deleteFormData')
      return true
    }
  }
};

export default resolvers;