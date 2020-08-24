import { ApolloServer } from "apollo-server-micro";
import { schema, getUser } from "../../graphql";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    const user = token && getUser(token);

    // add the user to the context
    return { user };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
