import * as http from "http";

import * as express from "express";
import * as cors from "cors";

import { json } from "body-parser";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { schema } from "@/Application/Ship/GraphQL/Schemas/index";
import { resolvers } from "@/Application/Ship/GraphQL/Resolvers/index";

class Application {
  hostname = "localhost";
  port = 4000;

  application = express();
  HTTPServer = http.createServer(this.application);

  server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: this.HTTPServer }),
      ApolloServerPluginLandingPageDisabled(),
    ],
  });

  Run() {
    this.Listen();
  }

  async Listen() {
    await this.server.start();

    this.application.use(
      "/",
      cors<cors.CorsRequest>({
        methods: ["GET", "POST", "OPTIONS"],
        origin: ["*"],
        credentials: true,
      }),
    );

    this.application.use("/", json());
    this.application.use("/", expressMiddleware(this.server));

    await new Promise<void>((resolve) => this.HTTPServer.listen({ port: 4000 }, resolve));
  }

  GetServer() {
    return this.server;
  }
}

export default new Application();
