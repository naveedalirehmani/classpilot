import path from "path";
import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "classPlanner",
      version: "1.0.0",
      description: "classPlanner Api Documentation",
      contact: {
        name: "classPlanner",
        email: "your-email@example.com",
      },
      servers: [
        {
          url: "http://localhost:4000",
          description: "Development server",
        },
      ],
    },
  },
  apis: [path.join(__dirname, "..", "/routes/*.ts"),
    path.join(__dirname, "..", "/docs/*.ts")
  ],
};  