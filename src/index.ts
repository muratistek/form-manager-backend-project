import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import morgan from 'morgan'
import http from 'http'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import schema from './graphql/schema'
import resolvers from './graphql/resolvers'
import db from './modules/db'

const app = express()
app.use(morgan('dev'))

app.get('/', async (req, res) => {
  const formEntries = await db.formEntry.findMany();
  res.json(formEntries)
})

const startApolloServer = async () => {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  await server.start();
  const port = Number(process.env.PORT) || 8080
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ host: '0.0.0.0', port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();

// In Docker, whenever you are attaching to a port in your server (express), always provide a second argument '0.0.0.0'
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on http://localhost:${port}`)
// })