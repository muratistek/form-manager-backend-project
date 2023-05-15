import { gql } from "apollo-server-core";

const schema = gql`
  scalar DateTime
  scalar JSON

  type Query {
    entries: [Entry!]!
  }

  type Mutation {
    queueEntryGeneration(count: Int): Boolean!
    deleteFormData: Boolean!
  }

  type Entry {
    id: ID!
    publishedAt: DateTime!
    formData: JSON!
  }
`;

export default schema;