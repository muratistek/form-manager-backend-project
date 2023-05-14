import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from 'graphql-iso-date'
import db from "../modules/db";

const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    entries: () => {
      return db.formEntry.findMany({ orderBy: { publishedAt: 'desc' } })
    },
  },
};

export default resolvers;