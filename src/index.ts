import { Hono } from "hono";
import apiRouter from "./routes/index";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", apiRouter);

export default app;
