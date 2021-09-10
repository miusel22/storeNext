import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Products } from "./src/Entities/Products";


const main = async () => {
  await createConnection({
    type: "postgres",
    host: "ec2-18-235-45-217.compute-1.amazonaws.com",
    port: 5432,
    username: "rgaledtuzimqip",
    password: "748cf736362cf6aef98e291de55443fdd4731d20d72110c2df616da667ae6318",
    database: "dg5791e6fngfr",
    logging: true,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      },
    },
    entities: [Products],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(4000, () => {
    console.log("SERVER RUNNING ON PORT 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
