import { ProjectOptions } from "../types/project-options";

export const buildAppFile = (options: ProjectOptions) => {
  const imports = [
    `import express from "express";`,
    `import cors from "cors";`,
    `import morgan from "morgan";`,
    ``,
    `import routes from "./routes";`,
    `import { errorMiddleware } from "./middlewares/error.middleware";`,
    `import { notFoundMiddleware } from "./middlewares/notFound.middleware";`,
  ];

  if (options.useSwagger) {
    imports.push(`import swaggerUi from "swagger-ui-express";`);
    imports.push(`import { swaggerSpec } from "./docs/swagger";`);
  }

  const swaggerBlock = options.useSwagger
    ? `
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
`
    : "";

  return `${imports.join("\n")}

// I create my Express app here so server.ts only focuses on starting the server.
const app = express();

// I allow the API to receive JSON request bodies.
app.use(express.json());

// I enable CORS so frontend apps can call this backend.
app.use(cors());

// I log incoming requests during development so debugging is easier.
app.use(morgan("dev"));
${swaggerBlock}
// I mount all API routes under /api/v1 so the project starts with versioned APIs.
app.use("/api/v1", routes);

// I keep this root route simple so I can quickly confirm the API is alive.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Generated backend is running successfully",
  });
});

// I catch routes that do not exist.
app.use(notFoundMiddleware);

// I keep the error middleware last so it can handle errors from all routes.
app.use(errorMiddleware);

export default app;
`;
};