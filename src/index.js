import {ApolloServer, gql, PubSub} from "apollo-server"
import faker from "faker"

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    ping: String
  }
  type Subscription {
    messageAdded: String
  }
`

const resolvers = {
  Query: {
    ping: () => "pong"
  },
  Subscription: {
    messageAdded: {
    subscribe: () => pubsub.asyncIterator("messageAdded")
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

setInterval(() => {
  const fakeMessage = faker.lorem.sentence()

  return pubsub.publish("messageAdded", {
    messageAdded: fakeMessage,
  })
}, 10000)

server.listen().then(({url}) => {
  console.log(`Listening at ${url}`)
})