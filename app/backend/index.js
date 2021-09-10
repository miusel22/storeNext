"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const Schema_1 = require("./src/Schema");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Products_1 = require("./src/Entities/Products");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
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
        entities: [Products_1.Products],
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: Schema_1.schema,
        graphiql: true,
    }));
    app.listen(4000, () => {
        console.log("SERVER RUNNING ON PORT 4000/graphql");
    });
});
main().catch((err) => {
    console.log(err);
});
